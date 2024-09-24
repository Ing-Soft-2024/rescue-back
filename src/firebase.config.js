// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase-admin/app";
import { getStorage, connectStorageEmulator } from "firebase-admin/storage";

// https://firebase.google.com/docs/web/setup#available-libraries

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAXos4Gxf0_2L-ToIRMkkOO0m8kZQh9mWI",
    authDomain: "rescue-app-12398.firebaseapp.com",
    projectId: "rescue-app-12398",
    storageBucket: "gs://rescue-app-12398.appspot.com",
    messagingSenderId: "140859937803",
    appId: "1:140859937803:web:501fe13485b9232ca4a30e",
    measurementId: "G-TD3JGR143M"
};

// Initialize Firebase
// Production
export const app = initializeApp(firebaseConfig);

export const storage = getStorage();


// Firebase Emulator
//connectAuthEmulator(auth, "http://localhost:9099");
//connectFirestoreEmulator(firestore, "localhost", 8080);
//connectStorageEmulator(storage, "localhost", 9199);