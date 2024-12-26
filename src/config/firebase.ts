// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBUSuUOmSDnVCvE9EU0EtwFVm9LOja9PXY",
    authDomain: "react-simple-blog-demo.firebaseapp.com",
    projectId: "react-simple-blog-demo",
    storageBucket: "react-simple-blog-demo.firebasestorage.app",
    messagingSenderId: "748150243602",
    appId: "1:748150243602:web:b0ffe1eae82782b14073cb",
    measurementId: "G-TDMYWTH8BC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export default app;
