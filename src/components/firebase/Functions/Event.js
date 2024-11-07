import { collection, addDoc,getDocs,doc,getDoc,updateDoc,deleteDoc} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL,deleteObject } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";  // For unique file names
import { storage,db } from "../fireAppConfig";




// the add event
/**
 * 
 * @param {object} event - The event object containing hosts (array of image files), venue, and date
 * @returns {object} - Success or failure message
 */
export async function addEvent(event) {
    try {
        const { hosts, venue, date,name,bg } = event;
        let hostImageUrls = [];

        // Step 1: Upload host images to Firebase Storage
        for (const hostImage of hosts) {
            const hostImageRef = ref(storage, `eventHosts/${uuidv4()}`);
            const snapshot = await uploadBytes(hostImageRef, hostImage);
            const imageUrl = await getDownloadURL(snapshot.ref);
            hostImageUrls.push(imageUrl);  // Store the image URL
        }
        const bgimg=ref(storage,`backgrounds/${uuidv4()}`)
        const snapshot=await uploadBytes(bgimg,bg)
        const bgurl=await getDownloadURL(snapshot.ref)

        // Step 2: Save the event details to Firestore
        const eventRef = collection(db, 'Events');
        await addDoc(eventRef, {
            hosts: hostImageUrls,   // Save the array of image URLs
            venue: venue,
            date: date,
            name:name,
            bg:bgurl
        });

        return {
            code: 200,
            message: 'Event added successfully'
        };

    } catch (err) {
        return {
            code: err.code || 500,
            message: err.message
        };
    }
}


// get all events

/**
 * 
 * @returns {object} - Success or failure message with all events
 */
export async function getAllEvents() {
    try {
        // Step 1: Get a reference to the 'Events' collection
        const eventsRef = collection(db, 'Events');

        // Step 2: Fetch all documents from the 'Events' collection
        const querySnapshot = await getDocs(eventsRef);

        // Step 3: Check if there are any events in the collection
        if (querySnapshot.empty) {
            return {
                code: 404,
                message: 'No events found'
            };
        }

        // Step 4: Map through the documents and return an array of event data
        const events = querySnapshot.docs.map(doc => ({
            id: doc.id,         // Get the document ID
            ...doc.data()       // Spread the event data into the object
        }));

        return {
            code: 200,
            events: events
        };

    } catch (err) {
        return {
            code: err.code || 500,
            message: err.message
        };
    }
}


// the get signle event

/**
 * 
 * @param {string} eventId - The event's Firestore document ID
 * @returns {object} - The event data or an error message
 */
export async function getSingleEvent(eventId) {
    try {
        // Step 1: Get the event document reference
        const eventRef = doc(db, 'Events', eventId);

        // Step 2: Fetch the document from Firestore
        const eventDoc = await getDoc(eventRef);

        // Step 3: Check if the document exists
        if (!eventDoc.exists()) {
            return {
                code: 404,
                message: 'Event not found'
            };
        }

        // Step 4: Return the event data
        const eventData = eventDoc.data();
        return {
            code: 200,
            event: eventData
        };

    } catch (err) {
        return {
            code: err.code || 500,
            message: err.message
        };
    }
}


// the update event

/**
 * 
 * @param {string} eventId - The event's Firestore document ID
 * @param {object} updatedEvent - The updated event object containing hosts (optional array of image files), venue, and date
 * @returns {object} - Success or failure message
 */
export async function updateEvent(eventId, updatedEvent) {
    try {
        let { hosts, venue, date ,name,bg} = updatedEvent;
        let hostImageUrls = [];

        // Step 1: Check if hosts are provided (if updating images)
        
        if (hosts && hosts.length > 0) {
            // Upload new host images to Firebase Storage
            for (const hostImage of hosts) {
                const hostImageRef = ref(storage, `eventHosts/${uuidv4()}`);
                const snapshot = await uploadBytes(hostImageRef, hostImage);
                const imageUrl = await getDownloadURL(snapshot.ref);
                hostImageUrls.push(imageUrl);  // Store the image URL
            }4
        }
        if(bg && bg.length > 0){
            const bgimg=ref(storage,`backgrounds/${uuidv4()}`)
            const snapshot=await uploadBytes(bgimg,bg)
            const bgurl=await getDownloadURL(snapshot.ref)
            bg=bgurl
        }
        // Step 2: Prepare the updated event data
        const updatedData = {};
        if (hostImageUrls.length > 0) {
            updatedData.hosts = hostImageUrls;  // Update hosts if new images were uploaded
        }
        if (venue) {
            updatedData.venue = venue;  // Update venue
        }
        if (date) {
            updatedData.date = date;  // Update date
        }
        if (name) {
            updatedData.name = name;  // Update date
        }
        if (bg.length>0) {
            updatedData.bg = bg;  // Update date
        }

        // Step 3: Update the event document in Firestore
        const eventRef = doc(db, 'Events', eventId);
        await updateDoc(eventRef, updatedData);

        return {
            code: 200,
            message: 'Event updated successfully'
        };

    } catch (err) {
        return {
            code: err.code || 500,
            message: err.message
        };
    }
}

// the delete event function

/**
 * 
 * @param {string} eventId - The event's Firestore document ID
 * @returns {object} - Success or failure message
 */
export async function deleteEvent(eventId) {
    try {
        // Step 1: Get the event document reference
        const eventRef = doc(db, 'Events', eventId);

        // Step 2: Fetch the event data to get associated host image URLs
        const eventDoc = await getDoc(eventRef);

        // Step 3: Check if the event exists
        if (!eventDoc.exists()) {
            return {
                code: 404,
                message: 'Event not found'
            };
        }

        const eventData = eventDoc.data();
        const { hosts } = eventData;  // Get host image URLs from event data

        // Step 4: Delete the associated images from Firebase Storage
        if (hosts && hosts.length > 0) {
            for (const imageUrl of hosts) {
                // Create a reference to the image in Firebase Storage
                const imageRef = ref(storage, imageUrl);
                await deleteObject(imageRef);  // Delete the image
            }
        }

        // Step 5: Delete the event document from Firestore
        await deleteDoc(eventRef);

        return {
            code: 200,
            message: 'Event and associated images deleted successfully'
        };

    } catch (err) {
        return {
            code: err.code || 500,
            message: err.message
        };
    }
}