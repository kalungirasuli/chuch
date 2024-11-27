import { collection, addDoc,getDoc,updateDoc,deleteDoc,doc,getDocs} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL,deleteObject } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";  // For unique image filenames
import { db,storage } from "../fireAppConfig";



// the add member

/**
 * 
 * @param {File} image - The team member's image file
 * @param {string} name - The team member's name
 * @param {string} title - The team member's title (e.g., "Engineer")
 * @param {string} role - The team member's role (e.g., "Developer", "Designer")
 * @param {object} data - Additional data for the team member
 * @returns {object} - Success or failure message
 */
export async function addTeamMember(member) {
    const { image, name, title, role, ...data } = member;
    if (!name || !title || !role ) {
        return {
            code: 400,
            message: 'Name, title, and role are required'
        };
    }
    try {
        let imageUrl = '';
        const id = uuidv4();
        // Step 1: Upload the image to Firebase Storage if provided
        if (image) {
            const imageRef = ref(storage, `teamImages/${id}`);  // Create unique reference for image
            const snapshot = await uploadBytes(imageRef, image);  // Upload the image
            imageUrl = await getDownloadURL(snapshot.ref);  // Get the download URL of the uploaded image
        }

        // Step 2: Prepare the team member data
        const teamMember = {
            memberId:id,
            image: imageUrl,  // The uploaded image URL
            name,
            title,
            role,
            ...data  // Additional data fields
        };

        // Step 3: Add the team member document to the 'TeamMembers' collection in Firestore
        const teamRef = collection(db, 'TeamMembers');
        await addDoc(teamRef, teamMember);

        return {
            code: 200,
            message: 'Team member added successfully'
        };

    } catch (err) {
        return {
            code: err.code || 500,
            message: err.message
        };
    }
}


// the update

/**
 * 
 * @param {string} memberId - The Firestore document ID of the team member
 * @param {File} newImage - The new image file for the team member (optional)
 * @param {string} name - The team member's updated name
 * @param {string} title - The updated title (e.g., "Engineer")
 * @param {string} role - The updated role (e.g., "Developer", "Designer")
 * @param {object} data - Additional updated data for the team member
 * @returns {object} - Success or failure message
 */
export async function updateTeamMember(member) {
    const {memberId, newImage, name, title, role, data } = member;
    try {
        // Step 1: Get the team member document reference
        const teamMemberRef = doc(db, 'TeamMembers', memberId);

        // Step 2: Fetch the current team member data
        const teamMemberDoc = await getDoc(teamMemberRef);
        if (!teamMemberDoc.exists()) {
            return {
                code: 404,
                message: 'Team member not found'
            };
        }

        const currentData = teamMemberDoc.data();
        let updatedData = { name, title, role, ...data };  // Prepare updated data
        // Step 3: Handle image update
        if (newImage) {
            // Delete the current image if it exists
            if (currentData.image) {
                const currentImageRef = ref(storage, currentData.image);
                await deleteObject(currentImageRef);  // Delete the current image from storage
            }

            // Upload the new image to Firebase Storage
            const newImageRef = ref(storage, `teamImages/${uuidv4()}`);  // Create unique reference for the new image
            const snapshot = await uploadBytes(newImageRef, newImage);  // Upload the new image
            const newImageUrl = await getDownloadURL(snapshot.ref);  // Get the download URL of the new image

            updatedData.image = newImageUrl;  // Update the image URL
        }

        // Step 4: Update the team member document in Firestore
        await updateDoc(teamMemberRef, updatedData);

        return {
            code: 200,
            message: 'Team member updated successfully'
        };

    } catch (err) {
        return {
            code: err.code || 500,
            message: err.message
        };
    }
}

// the delete

/**
 * 
 * @param {string} memberId - The Firestore document ID of the team member to delete
 * @returns {object} - Success or failure message
 */
export async function deleteTeamMember(memberId) {
    try {
        // Step 1: Get the team member document reference
        const teamMemberRef = doc(db, 'TeamMembers', memberId);

        // Step 2: Fetch the current team member data
        const teamMemberDoc = await getDoc(teamMemberRef);
        if (!teamMemberDoc.exists()) {
            return {
                code: 404,
                message: 'Team member not found'
            };
        }

        const teamMemberData = teamMemberDoc.data();
        const { image } = teamMemberData;  // Get the image URL to delete

        // Step 3: Delete the associated image from Firebase Storage if it exists
        if (image) {
            const imageRef = ref(storage, image);
            await deleteObject(imageRef);  // Delete the image from storage
        }

        // Step 4: Delete the team member document from Firestore
        await deleteDoc(teamMemberRef);

        return {
            code: 200,
            message: 'Team member deleted successfully'
        };

    } catch (err) {
        return {
            code: err.code || 500,
            message: err.message
        };
    }
}

// the get signle member


/**
 * 
 * @param {string} memberId - The Firestore document ID of the team member to retrieve
 * @returns {object} - The team member's data or an error message
 */
export async function getSingleTeamMember(memberId) {
    try {
        // Step 1: Get the team member document reference
        const teamMemberRef = doc(db, 'TeamMembers', memberId);

        // Step 2: Fetch the team member document
        const teamMemberDoc = await getDoc(teamMemberRef);
        if (!teamMemberDoc.exists()) {
            return {
                code: 404,
                message: 'Team member not found'
            };
        }

        // Step 3: Return the team member data
        return {
            code: 200,
            data: teamMemberDoc.data()  // Return the document data
        };

    } catch (err) {
        return {
            code: err.code || 500,
            message: err.message
        };
    }
}



// the get all team member

/**
 * @returns {object} - The list of team members or an error message
 */
export async function getAllTeamMembers() {
    try {
        // Step 1: Get the team members collection reference
        const teamMembersRef = collection(db, 'TeamMembers');

        // Step 2: Fetch all team member documents
        const teamMembersSnapshot = await getDocs(teamMembersRef);
        const teamMembersList = [];

        // Step 3: Process each document and add to the list
        teamMembersSnapshot.forEach(doc => {
            teamMembersList.push({ id: doc.id, ...doc.data() });  // Include document ID
        });

        return {
            code: 200,
            data: teamMembersList  // Return the list of team members
        };

    } catch (err) {
        return {
            code: err.code || 500,
            message: err.message
        };
    }
}