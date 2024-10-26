// const { containerClient } = require("../service");
// import { containerClient } from "../service";
import { deleteObject } from "firebase/storage";
import { storage } from "../service";
/**
 * Retrieves the content of the blob with the given name.
 * @param {string} blobName 
 * @returns {Promise<string>} - The content of the blob.
 */
export const getBlobData = async (blobName) => {
    // Avoid start spaces
    blobName = blobName.replace(/^\s+/g, '');

    const bucket = storage.bucket();
    const file = bucket.file(blobName);
    const response = await file.get().catch((err) => {
        console.error(err);
        throw new Error('Error al obtener el archivo');
    });

    console.log("response: ", response);
    const blockBlob = response[0];

    const download = await blockBlob.download();
    console.log("download: ", download);

    // const base64File = arrayBuffer.toString('base64');
    return download[0].toString('base64');
    return base64File;
};

export const generateBlobName = (name, ext) => {
    const timeStamp = new Date().getTime();
    const fullName = `${name}-${timeStamp}.${ext}`;
    fullName.replace(/\s/g, '_');
    return fullName;
}

/**
 * Creates a new blob for the given object and name.
 * @param {string} blobName 
 * @param {File} data 
 * @returns - The created blob.
 */
export const createBlob = async (blobName, file) => {
    const [name, ext, ...arr] = blobName.split('.');
    if (arr.length > 0 || name === undefined || ext === undefined) throw new Error('Invalid Blob Name');
    if (!(file instanceof File)) throw new Error('Invalid File');

    const data = await file.arrayBuffer();
    const bf = new Buffer.from(data);
    const fullName = generateBlobName(name, ext);
    const bucket = storage.bucket(process.env.FIREBASE_STORAGE_BUCKET);
    const fileBucket = bucket.file(fullName);

    await fileBucket.save(bf)
        .catch((err) => { console.error(err); throw new Error('Error al crear el archivo en el servidor'); });

    return fullName;
};

/**
 * Deletes the blob with the given name.
 * @param {string} blobName 
 * @returns - The deleted blob.
 */
export const deleteBlob = async (blobName) => {
    blobName = blobName.replace(/^\s+/g, '');
    await deleteObject(storage, blobName).catch((err) => {
        console.error(err);
        throw new Error('Error al eliminar el archivo');
    });
}