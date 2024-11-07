import { db } from "../fireAppConfig";
import {collection,getDocs,addDoc,doc,query,where,updateDoc,deleteDoc,getDoc} from "firebase/firestore";
import { storage } from "../fireAppConfig";
import { getDownloadURL, ref,uploadBytes,deleteObject } from "firebase/storage";
import { verifyToken } from "./Auth";
import { v4 as uuidv4 } from "uuid";


// the products

/**
 * 
 * @param {string} token -the auth token
 * @param {object} clientHeaders -the client headers 
 * @returns {object} -success or fail
 */
export async function ProductAll(token,clientHeaders){
    try{
        const verification= await verifyToken(token,clientHeaders)
        if(verification.code !== 200){
            return{
                code:verification.code,
                message:verification.message
            }
        }
        const ProductRef=collection(db,'Products')
        const data =await getDocs(ProductRef)
        if(!data.empty()){
            return{
                code:300,
                message:'No products found'
            }
        }
        data.docs.map((item)=>{
            return item.data()
        })
    }catch(err){
        return{
            code:err.code,
            message:err.message
        }
    }
}

//the product single
/**
 * 
 * @param {string} id .the productId
 * @param {string} token -the auth token 
 * @param {object} clientHeaders  -the client headers
 * @returns {object} -success or fail  
 */
export async function ProductSingle(id,token,clientHeaders){
    try{
        const verification= await verifyToken(token,clientHeaders)
        if(verification.code !== 200){
            return{
                code:verification.code,
                message:verification.message
            }
        }
        const ProductRef=collection(db,'Products')
        const q= query(ProductRef,where('id','==',id))
        const data =await getDocs(q)
        if(!data.empty()){
            return{
                code:300,
                message:'No products found'
            }
        }
        data.docs.map((item)=>{
            return item.data()
        })
    }catch(error){
        return{
            code:error.code,
            message:'Fail to retrive product, try again later.👾'
        }
    }
}

/**
 * 
 * @param {string} token - the auth token
 * @param {object} clientHeaders - the client headers
 * @param {object} product - the product object, including a file property for the image
 * @returns {object} - success or fail
 */
export async function ProductAdd(token, clientHeaders, product) {
    try {
        // Step 1: Verify the token
        const verification = await verifyToken(token, clientHeaders);
        if (verification.code !== 200) {
            return {
                code: verification.code,
                message: verification.message
            };
        }

        // Step 2: Upload product image to Firebase Storage (if exists)
        let imageUrl = '';
        if (product.imageFile) {  // Assume `product.imageFile` contains the image file
            const imageRef = ref(storage, `productImages/${uuidv4()}`); // Unique file name
            const snapshot = await uploadBytes(imageRef, product.imageFile);
            imageUrl = await getDownloadURL(snapshot.ref);  // Get the image URL
        }

        // Step 3: Add the product to Firestore with the image URL
        const productRef = collection(db, 'Products');
        const productData = {
            ...product,
            imageUrl: imageUrl  // Include image URL in the product object
        };
        delete productData.imageFile; // Remove imageFile from product before storing in Firestore
        await addDoc(productRef, productData);

        return {
            code: 200,
            message: 'Product added successfully'
        };
    } catch (err) {
        return {
            code: err.code || 500,
            message: err.message
        };
    }
}
// the product delete
/**
 * 
 * @param {string} id - the productId
 * @param {string} token - the auth token
 * @param {object} clientHeaders - the client headers
 * @returns {object} - success or fail
 */
export async function ProductDelete(id, token, clientHeaders) {
    try {
        // Step 1: Verify the token
        const verification = await verifyToken(token, clientHeaders);
        if (verification.code !== 200) {
            return {
                code: verification.code,
                message: verification.message
            };
        }

        // Step 2: Retrieve the product document from Firestore
        const productRef = doc(db, 'Products', id);
        const productDoc = await getDoc(productRef);

        if (!productDoc.exists()) {
            return {
                code: 404,
                message: 'Product not found'
            };
        }

        const productData = productDoc.data();

        // Step 3: Delete the product image from Firebase Storage (if it exists)
        if (productData.imageUrl) {
            const imageRef = ref(storage, productData.imageUrl);  // Use the imageUrl stored in Firestore
            await deleteObject(imageRef);  // Delete the image from Firebase Storage
        }

        // Step 4: Delete the product document from Firestore
        await deleteDoc(productRef);

        return {
            code: 200,
            message: 'Product deleted successfully from both Firestore and Storage'
        };

    } catch (err) {
        return {
            code: err.code || 500,
            message: err.message
        };
    }
}

// the update product

/**
 * 
 * @param {string} id - the productId
 * @param {string} token - the auth token
 * @param {object} clientHeaders - the client headers
 * @param {object} product - the product object, including a new image file (optional)
 * @returns {object} - success or fail
 */
export async function ProductUpdate(id, token, clientHeaders, product) {
    try {
        // Step 1: Verify the token
        const verification = await verifyToken(token, clientHeaders);
        if (verification.code !== 200) {
            return {
                code: verification.code,
                message: verification.message
            };
        }

        // Step 2: Get the existing product document
        const productRef = doc(db, 'Products', id);
        const productDoc = await getDoc(productRef);

        if (!productDoc.exists()) {
            return {
                code: 404,
                message: 'Product not found'
            };
        }

        const existingProduct = productDoc.data();
        let newImageUrl = existingProduct.imageUrl;

        // Step 3: Handle product image update (if a new image is provided)
        if (product.imageFile) {
            // Delete the old image from Firebase Storage (if exists)
            if (existingProduct.imageUrl) {
                const oldImageRef = ref(storage, existingProduct.imageUrl);
                await deleteObject(oldImageRef);
            }

            // Upload the new image to Firebase Storage
            const newImageRef = ref(storage, `productImages/${uuidv4()}`);
            const snapshot = await uploadBytes(newImageRef, product.imageFile);
            newImageUrl = await getDownloadURL(snapshot.ref);
        }

        // Step 4: Update the product document in Firestore
        const updatedProduct = {
            ...product,
            imageUrl: newImageUrl  // Update the image URL if it has changed
        };
        delete updatedProduct.imageFile;  // Remove the imageFile from product before saving

        await updateDoc(productRef, updatedProduct);

        return {
            code: 200,
            message: 'Product updated successfully'
        };

    } catch (err) {
        return {
            code: err.code || 500,
            message: err.message
        };
    }
}