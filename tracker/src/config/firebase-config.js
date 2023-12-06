// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB5ej8i3T8u2PNIfhQ97JJFEUsG5hW5a5Q",
    authDomain: "expense-tracker-9b598.firebaseapp.com",
    projectId: "expense-tracker-9b598",
    storageBucket: "expense-tracker-9b598.appspot.com",
    messagingSenderId: "768723088624",
    appId: "1:768723088624:web:5700a4c0a916870fc53e35",
    measurementId: "G-PKVZBSYRQN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app)