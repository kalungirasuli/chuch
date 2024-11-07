import jsonwebtoken3e from "jsonwebtoken"; // For generating JWT
import { v4 as uuidv4 } from 'uuid'; // For generating unique token ids
import bcrypt from "bcrypt"; // For hashing passwords
import { db } from "../fireAppConfig";
import { collection, getDocs,addDoc,doc,query,where,deleteDoc,updateDoc,setDoc } from "firebase/firestore";
import { render } from '@react-email/components';
import nodemailer from 'nodemailer';
import { Email } from './email'


const secretKey =import.meta.env.VITE_SECRET_KEY;

//signup
export async function Signup(name, email, password) {
    const collectionRef = collection(db, 'users');
    const saltRounds = 10;
  
    try {
      // Hash the password asynchronously
      const hashedPassword = await bcrypt.hash(password, saltRounds);
  
      // Add the user document to Firestore
      await addDoc(collectionRef, {
        email: email,
        password: hashedPassword, // Use the hashed password
        name: name
      });
  
      // Return success response
      return {
        code: 200,
        message: 'User created successfully'
      };
  
    } catch (error) {
      // Catch any error and return error response
      return {
        code: error.code || 500,
        message: error.message || 'Error creating user'
      };
    }
  }


//login

export async function Login(email, password, clientHeaders) {
 
  try {
    // Step 1: Query the user by email
    const q = query(collection(db, 'users'), where('email', '==', email));
    const querySnapshot = await getDocs(q);

    // Check if the user exists
    if (querySnapshot.empty) {
      return {
        code: 404,
        message: 'User not found'
      };
    }

    // Get the user data from Firestore
    const userDoc = querySnapshot.docs[0]; // Assuming email is unique, only one doc should be found
    const userData = userDoc.data();

    // Step 2: Compare the provided password with the hashed password from Firestore
    const isPasswordValid = await bcrypt.compare(password, userData.password);

    if (!isPasswordValid) {
      return {
        code: 401,
        message: 'Invalid password'
      };
    }

    // Step 3: Check client headers for unknown values
    const userAgent = clientHeaders['user-agent'] || 'unknown';
    const ipAddress = clientHeaders['x-forwarded-for'] || clientHeaders['remote-addr'] || 'unknown';

    if (userAgent === 'unknown' || ipAddress === 'unknown') {
      return {
        code: 403,
        message: 'Login attempt detected from suspicious source'
      };
    }

    // Step 4: Generate JWT
    const tokenPayload = {
      id: userDoc.id, // unique identifier of the user
      email: userData.email,
      name: userData.name,
    };
    const token = jsonwebtoken3e.sign(tokenPayload, secretKey, { expiresIn: '1h' });

    // Step 5: Hash the token with client headers
    const combinedData = `${token}${userAgent}${ipAddress}`;
    const saltRounds = 10;
    const hashedToken = await bcrypt.hash(combinedData, saltRounds);

    // Step 6: Store the hashed token in the 'logged' collection
    const loggedCollectionRef = collection(db, 'logged');
    const tokenDoc = {
      userId: userDoc.id,   // Reference to the user
      token: hashedToken,    // Store the hashed token
      createdAt: new Date(),
      tokenId: uuidv4(),     // Optional: Unique token identifier for tracking
    };

    await addDoc(loggedCollectionRef, tokenDoc);

    // Step 7: Return the generated JWT to the client
    return {
      code: 200,
      message: 'Login successful',
      token: token, // Send the plain token to the client
    };

  } catch (error) {
    return {
      code: error.code || 500,
      message: error.message || 'Error logging in'
    };
  }
}


//the update login
/** 
 *function to verify a JWT token and generate a new token with updated client details.
    * @param {string} token - JWT token from the user
    * @param {object} clientHeaders - Client headers containing user-agent and IP
    * @returns {object} -Success or error response
  */ 
export async function verifyToken(token, clientHeaders) {
    let decoded;
    try {
      // Step 1: Try verifying the JWT token (check structure and signature)
      decoded = jsonwebtoken3e.verify(token, secretKey); // This will verify structure and signature
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        // Token is expired, but the structure and signature are valid
        decoded = jsonwebtoken3e.decode(token); // Decode the token and proceed with verification steps
      } else {
        // If the token is invalid (wrong structure or signature), return an error
        return {
          code: 401,
          message: 'Invalid token structure. Please log in again.'
        };
      }
    }
    // At this point, we know the token has a valid structure (even if it's expired)
    // Step 2: Validate client headers (must not be unknown)
    const userAgent = clientHeaders['user-agent'];
    const ipAddress = clientHeaders['x-forwarded-for'] || clientHeaders['remote-addr'];
  
    if (!userAgent || !ipAddress) {
      return {
        code: 400,
        message: 'Invalid client headers: user-agent and IP address must not be unknown'
      };
    }
  
    // Step 3: Prepare client details for hashing (user-agent and IP address)
    const combinedData = `${token}${userAgent}${ipAddress}`;
  
    // Step 4: Query the 'logged' collection to find the stored hashed token for this user
    const userId = decoded.id; // Use user ID from the decoded token
    const q = query(collection(db, 'logged'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
  
    if (querySnapshot.empty) {
      return { code: 401, message: 'Login please' }; // No session found
    }
  
    // Step 5: Retrieve the stored hashed token
    const loggedDoc = querySnapshot.docs[0];
    const storedHashedToken = loggedDoc.data().token;
  
    // Step 6: Hash the combined data (token + client details)
    const isMatch = await bcrypt.compare(combinedData, storedHashedToken);
  
    if (!isMatch) {
      return { code: 401, message: 'Login please' }; // Headers or token don't match
    }
  
    // Step 7: If the hashed token and headers match, generate a new JWT token
    const newTokenPayload = {
      id: decoded.id, // Use the original user ID from the verified token
      email: decoded.email,
      name: decoded.name,
    };
    const newToken = jsonwebtoken3e.sign(newTokenPayload, secretKey, { expiresIn: '1h' });
  
    // Step 8: Hash the new token + client details (user-agent + IP)
    const newCombinedData = `${newToken}${userAgent}${ipAddress}`;
    const saltRounds = 10;
    const newHashedToken = await bcrypt.hash(newCombinedData, saltRounds);
  
    // Step 9: Delete the old token from the 'logged' collection
    await deleteDoc(doc(db, 'logged', loggedDoc.id));
  
    // Step 10: Save the new hashed token to the 'logged' collection
    await addDoc(collection(db, 'logged'), {
      userId: userId,
      token: newHashedToken,
      createdAt: new Date(), // Optional: Timestamp for token creation
    });
    // Step 11: Return the new token to the user
    return {
      code: 200,
      message: 'New token generated',
      token: newToken
    };
  }

  //logout

/** 
* Function to log out a user by deleting their session token from Firestore.
* @param {string} userId - ID of the user to log out
* @returns {object} - Success or error response
 */
 export async function Logout(userId){
    try{
        await deleteDoc(doc(db,'logged',userId))
        return{
            code:200,
            message:'Logout was successful'
        }
    }
    catch(err){
        return{
            code:err.code,
            message:err.message
        }
    }
 }
  
 //update profile
/**
 * Function to update a user's profile after verifying their token.
 * @param {string} token - JWT token from the user
 * @param {object} clientHeaders - Client headers containing user-agent and IP
 * @param {string} userId - ID of the user whose profile is to be updated
 * @param {object} updatedData - The updated profile data (e.g., name, email, etc.)
 * @returns {object} - Success or error response
 */
export async function profileUpdate(token, clientHeaders, userId, updatedData) {
  try {
    // Step 1: Verify the token
    const verificationResponse = await verifyToken(token, clientHeaders);

    // Step 2: Check if the token verification was successful
    if(verificationResponse.code === 200){
      // Step 3: If the token is valid, proceed to update the user's profile
      const userDocRef = doc(db, 'users', userId);

      // Update the user's profile with the new data
      await updateDoc(userDocRef, updatedData);

      return {
        code: 200,
        message: 'Profile updated successfully',
        updatedData: updatedData, // Optional: Return the updated data
      };
    } else {
      // If the token verification failed, return the verification error
      return {
        code: verificationResponse.code,
        message: verificationResponse.message,
      };
    }
  } catch (error) {
    // Handle any errors that occurred during the profile update process
    return {
      code: 500,
      message: 'Error updating profile: ' + error.message,
    };
  }
}


//reset password

// Set up the transporter for nodemailer
const transporter = nodemailer.createTransport({
    host: import.meta.VITE_HOST,
    port: import.meta.VITE_PORT,
    secure: true,
    auth: {
      user: import.meta.VITE_USERNAME, // Your email user
      pass: import.meta.VITE_PASSWORD, // Your email password
    },
  });
  
  /**
   * Function to send a password reset email with a code.
   * @param {string} userEmail - The email of the user requesting a password reset
   * @returns {object} - Success or error response
   */
  export async function sendPasswordResetEmail(userEmail) {
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit code
  
    // Step 1: Store the reset code in the database with an expiration time
    const expirationTime = Date.now() + 60000; // 1 minute from now
    await setDoc(doc(db, 'passwordResets', userEmail), {
      code: resetCode,
      expiresAt: expirationTime
    });
  
    // Step 2: Render the email content with the reset code
    const emailHtml = await render(<Email url={`https://example.com/reset?code=${resetCode}`} />); // Include the reset code in the URL
  
    // Step 3: Send the email with the reset code
    const options = {
      from: 'kalungirasuli@gmail.com',
      to: userEmail,
      subject: 'Password Reset Code',
      html: emailHtml,
    };
  
    try {
      await transporter.sendMail(options);
      return {
        code: 200,
        message: 'Password reset code sent to your email'
      };
    } catch (error) {
      return {
        code: 500,
        message: 'Error sending email: ' + error.message
      };
    }
  }
  
  /**
   * Function to validate the reset code and update the password.
   * @param {string} userEmail - The email of the user
   * @param {string} code - The reset code provided by the user
   * @param {string} newPassword - The new password to be set
   * @returns {object} - Success or error response
   */
  export async function validateResetCodeAndUpdatePassword(userEmail, code, newPassword) {
    try {
      // Step 1: Retrieve the stored reset code and expiration time
      const resetDocRef = doc(db, 'passwordResets', userEmail);
      const resetDoc = await getDocs(resetDocRef);
  
      if (!resetDoc.exists()) {
        return {
          code: 400,
          message: 'Reset code not found. Please request a new code.'
        };
      }
  
      const { code: storedCode, expiresAt } = resetDoc.data();
  
      // Step 2: Check if the code is valid and not expired
      if (storedCode !== code) {
        return {
          code: 400,
          message: 'Invalid reset code.'
        };
      }
  
      if (Date.now() > expiresAt) {
        // Code is expired, delete the record and return error
        await deleteDoc(resetDocRef);
        return {
          code: 400,
          message: 'Reset code has expired. Please request a new code.'
        };
      }
  
      // Step 3: Hash the new password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
  
      // Step 4: Update the user's password in Firestore
      const userDocRef = doc(db, 'users', userEmail); // Assuming user document is identified by email
      await updateDoc(userDocRef, {
        password: hashedPassword
      });
  
      // Step 5: Delete the reset code from the database
      await deleteDoc(resetDocRef);
  
      // Step 6: Send confirmation email
      const confirmationEmailHtml = await render(<Email url="https://example.com" />); // Adjust the confirmation email content as needed
      const confirmationOptions = {
        from: 'kalungirasuli495@gmal.com',
        to: userEmail,
        subject: 'Password Updated Successfully',
        html: confirmationEmailHtml,
      };
  
      await transporter.sendMail(confirmationOptions);
  
      return {
        code: 200,
        message: 'Password updated successfully'
      };
    } catch (error) {
      return {
        code: 500,
        message: 'Error updating password: ' + error.message
      };
    }
  }


 