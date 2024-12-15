import { cert, initializeApp } from "firebase-admin/app";
import { getStorage } from "firebase-admin/storage";

// https://firebase.google.com/docs/web/setup#available-libraries

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    "apiKey": process.env.FIREBASE_API_KEY,
    "authDomain": process.env.FIREBASE_DOMAIN,
    "projectId": process.env.FIREBASE_PROJECT_ID,
    "storageBucket": process.env.FIREBASE_STORAGE_BUCKET,
    "messagingSenderId": process.env.FIREBASE_MESSAGE_ID,
    "appId": process.env.FIREBASE_APP_ID,
    "measurementId": process.env.FIREBASE_MEASUREMENT_ID
};




const serviceAccount = JSON.parse(process.env.GOOGLE_CREDENTIALS);

// Initialize Firebase
// Production
export const app = initializeApp({
    credential: cert(serviceAccount),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET
});
export const storage = getStorage();
