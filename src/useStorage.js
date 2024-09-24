
import { storage as cloudStorage } from "./firebase.config.js";
import { getBlob, ref } from "firebase-admin/storage";
const admin = require('firebase-admin');




    /**
     * @description Get the blob of a file hosted in the Firebase Storage Server.
     * @param {string} path 
     * @param {boolean} forceUpdate 
     * @returns {Promise<Blob>} The blob of the file.
     */
    export const getStorage = async (path, forceUpdate = false) => {
        if(!path) return null;
        if(!forceUpdate && storage.has(path)) return storage.get(path);
        
        const blobReference = ref(cloudStorage, path);
        // Get the data from Firebase.
        return getBlob(blobReference);
    }

     export const uploadStorage = async (path, blob) => {
        // Upload the file to Firebase.
        // ...
        // App Users can't upload files to Firebase Storage.
        // Only the Admin can do it.
        // ...
        //await uploadBytes(ref(cloudStorage, path), blob);
        // Set the file in the map.
       // await cloudStorage.bucket("gs://rescue-app-12398.appspot.com").upload(path, {});
       await cloudStorage.bucket().file(path).save(blob);
    }

  

    /**
     * @description Delete a file from the map.
     * @param {string} path 
     * @param {boolean} purge - If true, the file will be deleted from Firebase too.
     * @returns {void}
     */
    const deleteStorage = (path, purge = false) => setStorage((prev) => {
        let newStorage = new Map(prev);
        newStorage.delete(path);
        if(purge) storageRemove(path);

        return newStorage;
    });

    /**
     * @description Delete a file from Firebase and from the map.
     * @param {string} path 
     * @returns {void}
     */
    const purgeStorage = (path) => deleteStorage(path, true);

    /**
     * @description Wrap function - Deletes a file from Firebase.
     * @param {string} path 
     * @returns {void}
     */
    const storageRemove = (path) => {
        // Delete the file from Firebase.
        // ...
        // App Users can't delete files from Firebase Storage.
        // Only the Admin can do it.
        // ...
        throw new Error("App Users can't delete files from Firebase Storage.");
    }

    /**
     * @description Clears the map.
     * @returns {void}
     */
    //const clearStorage = () => setStorage(new Map);
