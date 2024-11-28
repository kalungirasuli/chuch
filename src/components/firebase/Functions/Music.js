import { storage,db } from "../fireAppConfig";
import { collection, addDoc,updateDoc,deleteDoc,getDoc,getDocs,doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL,deleteObject } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";  // For unique file names

// upload single song
/**
 * 
 * @param {object} album - The album object containing name, artist, cover picture, audio file, lyrics, and an array of links
 * @returns {object} - Success or failure message
 */
export async function loadAlbum(album) {
    try {
        // Step 1: Upload the cover picture to Firebase Storage
       if( !album.name||!album.audioFile||!album.coverFile||!album.artists){
        return{
            code: 404,
            message: 'failed to post , some data is missing  please check and try again'
        }
    }
        let coverUrl = '';
        if (album.coverFile) {  // Assuming album.coverFile contains the cover image file
            const coverRef = ref(storage, `albumCovers/${uuidv4()}`);
            const coverSnapshot = await uploadBytes(coverRef, album.coverFile);
            coverUrl = await getDownloadURL(coverSnapshot.ref);

        }else{
            return {
                code: 500,
                message: 'failed to post music cover content please try again'
            };
        }

        // Step 2: Upload the audio file to Firebase Storage
        let audioUrl = '';
        if (album.audioFile) {  // Assuming album.audioFile contains the audio file
            const audioRef = ref(storage, `albumAudio/${uuidv4()}`);
            const audioSnapshot = await uploadBytes(audioRef, album.audioFile);
            audioUrl = await getDownloadURL(audioSnapshot.ref);
        }else{
            return {
                code: 500,
                message: 'failed to post music content audio please try again'
            };
        }

        // Step 3: Save album data to Firestor e
        const albumData = {
            name: album.name,
            artist: album.artist,
            coverUrl: coverUrl,     // Store the cover image URL
            audioUrl: audioUrl,     // Store the audio file URL
            lyrics: album.lyrics,   // Store the lyrics text
            links: album.links      // Store array of external links (Spotify, Apple Music, YouTube)

        };
        
        if(albumData.audioUrl!=='' && albumData.coverUrl!==''  && albumData.artist && albumData.name){
            const albumRef = collection(db, 'Albums');
             await addDoc(albumRef, albumData);
             return {
                code: 200,
                message: 'Album uploaded successfully'
            };
        }

       

    } catch (err) {
        return {
            code: err.code || 500,
            message: err.message
        };
    }
}


// the music update

/**
 * 
 * @param {string} albumId - The album's Firestore document ID
 * @param {object} album - The updated album object containing name, artist, cover picture, audio file, lyrics, and an array of links
 * @returns {object} - Success or failure message
 */
export async function updateAlbum(albumId, album) {
    try {
        // Step 1: Get the existing album document from Firestore
        const albumRef = doc(db, 'Albums', albumId);
        const albumDoc = await getDoc(albumRef);

        if (!albumDoc.exists()) {
            return {
                code: 404,
                message: 'Album not found'
            };
        }

        const existingAlbum = albumDoc.data();
        let updatedCoverUrl = existingAlbum.coverUrl;
        let updatedAudioUrl = existingAlbum.audioUrl;

        // Step 2: Handle cover picture update (if a new cover file is provided)
        if (album.coverFile) {
            // Delete the old cover image from Firebase Storage (if it exists)
            if (existingAlbum.coverUrl) {
                const oldCoverRef = ref(storage, existingAlbum.coverUrl);
                await deleteObject(oldCoverRef);
            }

            // Upload the new cover image to Firebase Storage
            const newCoverRef = ref(storage, `albumCovers/${uuidv4()}`);
            const coverSnapshot = await uploadBytes(newCoverRef, album.coverFile);
            updatedCoverUrl = await getDownloadURL(coverSnapshot.ref);
        }

        // Step 3: Handle audio file update (if a new audio file is provided)
        if (album.audioFile) {
            // Delete the old audio file from Firebase Storage (if it exists)
            if (existingAlbum.audioUrl) {
                const oldAudioRef = ref(storage, existingAlbum.audioUrl);
                await deleteObject(oldAudioRef);
            }

            // Upload the new audio file to Firebase Storage
            const newAudioRef = ref(storage, `albumAudio/${uuidv4()}`);
            const audioSnapshot = await uploadBytes(newAudioRef, album.audioFile);
            updatedAudioUrl = await getDownloadURL(audioSnapshot.ref);
        }

        // Step 4: Update the album document in Firestore
        const updatedAlbumData = {
            name: album.name || existingAlbum.name,         // Update name if provided
            artist: album.artist || existingAlbum.artist,   // Update artist if provided
            coverUrl: updatedCoverUrl || existingAlbum.coverUrl,                    // Update cover image URL
            audioUrl: updatedAudioUrl||  existingAlbum.audioUrl,                  // Update audio file URL
            lyrics: album.lyrics || existingAlbum.lyrics,   // Update lyrics if provided
            links: album.links || existingAlbum.links       // Update links if provided
        };

        await updateDoc(albumRef, updatedAlbumData);

        return {
            code: 200,
            message: 'Album updated successfully'
        };

    } catch (err) {
        return {
            code: err.code || 500,
            message: err.message
        };
    }
}



// the delete music

/**
 * 
 * @param {string} albumId - The album's Firestore document ID
 * @returns {object} - Success or failure message
 */
export async function deleteAlbum(albumId) {
    try {
        // Step 1: Get the album document from Firestore
        const albumRef = doc(db, 'Albums', albumId);
        const albumDoc = await getDoc(albumRef);

        if (!albumDoc.exists()) {
            return {
                code: 404,
                message: 'Album not found'
            };
        }

        const existingAlbum = albumDoc.data();

        // Step 2: Delete the cover image from Firebase Storage (if it exists)
        if (existingAlbum.coverUrl) {
            const coverRef = ref(storage, existingAlbum.coverUrl);
            await deleteObject(coverRef);
        }

        // Step 3: Delete the audio file from Firebase Storage (if it exists)
        if (existingAlbum.audioUrl) {
            const audioRef = ref(storage, existingAlbum.audioUrl);
            await deleteObject(audioRef);
        }

        // Step 4: Delete the album document from Firestore
        await deleteDoc(albumRef);

        return {
            code: 200,
            message: 'Album deleted successfully'
        };

    } catch (err) {
        return {
            code: err.code || 500,
            message: err.message
        };
    }
}

// get single music

/**
 * 
 * @param {string} albumId - The album's Firestore document ID
 * @returns {object} - The album data or an error message
 */
export async function getSingleAlbum(albumId) {
    try {
        // Step 1: Get the album document reference
        const albumRef = doc(db, 'Albums', albumId);

        // Step 2: Fetch the document from Firestore
        const albumDoc = await getDoc(albumRef);

        // Step 3: Check if the document exists
        if (!albumDoc.exists()) {
            return {
                code: 404,
                message: 'Album not found'
            };
        }

        // Step 4: Return the album data
        const albumData = albumDoc.data();
        return {
            code: 200,
            album: albumData
        };

    } catch (err) {
        return {
            code: err.code || 500,
            message: err.message
        };
    }
}


// Get all music

/**
 * 
 * @returns {object} - Success or failure message with all songs (albums)
 */
export async function getAllSongs() {
    try {
        // Step 1: Get a reference to the 'Albums' collection
        const albumsRef = collection(db, 'Albums');

        // Step 2: Fetch all documents from the 'Albums' collection
        const querySnapshot = await getDocs(albumsRef);

        // Step 3: Check if there are any albums in the collection
        if (querySnapshot.empty) {
            return {
                code: 200,
                message: 'No songs found'
            };
        }

        // Step 4: Map through the documents and return an array of album data
        const albums = querySnapshot.docs.map(doc => ({
            id: doc.id,        // Get the document ID
            ...doc.data()      // Spread the album data into the object
        }));

        return {
            code: 200,
            songs: albums
        };

    } catch (err) {
        return {
            code: err.code || 500,
            message: err.message
        };
    }
}