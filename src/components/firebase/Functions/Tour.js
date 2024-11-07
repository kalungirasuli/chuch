import { collection, addDoc,updateDoc,getDoc,doc,getDocs,deleteDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL,deleteObject } from "firebase/storage";
import { v4 as uuidv4 } from "uuid"; // For unique video filenames
import { db,storage } from "../fireAppConfig";
/**
 * 
 * @param {File} video - The video file for the tour
 * @param {string} description - The text description of the tour
 * @param {string} title - The title of the tour
 * @param {Date} date - The date of the tour
 * @param {string} author - The author of the tour
 * @returns {object} - Success or failure message
 */
export async function addTour(video, description, title, date, author) {
    try {
        // Step 1: Upload the video to Firebase Storage
        const videoRef = ref(storage, `tours/${uuidv4()}`); // Create a unique reference for the video
        const snapshot = await uploadBytes(videoRef, video); // Upload the video
        const videoUrl = await getDownloadURL(snapshot.ref); // Get the download URL of the video

        // Step 2: Create the tour event data
        const tourData = {
            video: videoUrl,
            description,
            title,
            date: date.toISOString(), // Store date as an ISO string for better compatibility
            author,
            createdAt: new Date().toISOString(), // Optional: store the creation timestamp
        };

        // Step 3: Add the tour event to Firestore
        const toursRef = collection(db, 'Tours');
        await addDoc(toursRef, tourData);

        return {
            code: 200,
            message: 'Tour added successfully',
        };
    } catch (err) {
        return {
            code: err.code || 500,
            message: err.message,
        };
    }
}


// the update event

/**
 * 
 * @param {string} tourId - The Firestore document ID of the tour to update
 * @param {File|null} video - The new video file for the tour (null if not updating)
 * @param {string} description - The updated text description of the tour
 * @param {string} title - The updated title of the tour
 * @param {Date} date - The updated date of the tour
 * @param {string} author - The updated author of the tour
 * @returns {object} - Success or failure message
 */
export async function updateTour(tourId, video, description, title, date, author) {
    try {
        // Step 1: Create a reference to the tour document in Firestore
        const tourRef = doc(db, 'Tours', tourId);

        // Step 2: Create the updates object
        const updates = {
            description,
            title,
            date: date.toISOString(), // Store date as an ISO string
            author,
        };

        // Step 3: If a new video is provided, upload it
        if (video) {
            const videoRef = ref(storage, `tours/${uuidv4()}`); // Create a unique reference for the new video
            const snapshot = await uploadBytes(videoRef, video); // Upload the new video
            const videoUrl = await getDownloadURL(snapshot.ref); // Get the download URL of the new video

            updates.video = videoUrl; // Add the new video URL to updates
        }

        // Step 4: Update the tour document in Firestore
        await updateDoc(tourRef, updates);

        return {
            code: 200,
            message: 'Tour updated successfully',
        };
    } catch (err) {
        return {
            code: err.code || 500,
            message: err.message,
        };
    }
}

// the get all Tours

/**
 * @returns {object} - The list of tours or an error message
 */
export async function getAllTours() {
    try {
        // Step 1: Get the reference to the Tours collection
        const toursRef = collection(db, 'Tours');

        // Step 2: Fetch all tour documents
        const toursSnapshot = await getDocs(toursRef);
        const toursList = [];

        // Step 3: Process each document and add it to the list
        toursSnapshot.forEach(doc => {
            toursList.push({ id: doc.id, ...doc.data() });  // Include document ID
        });

        return {
            code: 200,
            data: toursList  // Return the list of tours
        };

    } catch (err) {
        return {
            code: err.code || 500,
            message: err.message
        };
    }
}

// the get single tour

/**
 * 
 * @param {string} tourId - The Firestore document ID of the tour to retrieve
 * @returns {object} - The tour data or an error message
 */
export async function getSingleTour(tourId) {
    try {
        // Step 1: Create a reference to the specific tour document
        const tourRef = doc(db, 'Tours', tourId);

        // Step 2: Fetch the document
        const tourSnapshot = await getDoc(tourRef);

        // Step 3: Check if the document exists
        if (!tourSnapshot.exists()) {
            return {
                code: 404,
                message: 'Tour not found',
            };
        }

        // Step 4: Return the tour data
        return {
            code: 200,
            data: { id: tourSnapshot.id, ...tourSnapshot.data() }  // Include document ID
        };

    } catch (err) {
        return {
            code: err.code || 500,
            message: err.message
        };
    }
}

// the delete tours

/**
 * 
 * @param {string} tourId - The Firestore document ID of the tour to delete
 * @returns {object} - Success or failure message
 */
export async function deleteTour(tourId) {
    try {
        // Step 1: Create a reference to the specific tour document
        const tourRef = doc(db, 'Tours', tourId);

        // Step 2: Fetch the document to get the video URL
        const tourSnapshot = await getDoc(tourRef);
        
        if (!tourSnapshot.exists()) {
            return {
                code: 404,
                message: 'Tour not found',
            };
        }

        const tourData = tourSnapshot.data();
        const videoUrl = tourData.video; // Assuming video URL is stored in the 'video' field

        // Step 3: Delete the video from storage if it exists
        if (videoUrl) {
            const videoRef = ref(storage, videoUrl);
            await deleteObject(videoRef);
        }

        // Step 4: Delete the document from Firestore
        await deleteDoc(tourRef);

        return {
            code: 200,
            message: 'Tour and associated video deleted successfully',
        };

    } catch (err) {
        return {
            code: err.code || 500,
            message: err.message
        };
    }
}