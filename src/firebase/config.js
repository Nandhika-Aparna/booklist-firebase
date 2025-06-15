// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAgY69eZWAUNPMjY_nJQBU87It0p1yQLPA",
  authDomain: "book-list-with-firebase-6d182.firebaseapp.com",
  projectId: "book-list-with-firebase-6d182",
  storageBucket: "book-list-with-firebase-6d182.firebasestorage.app",
  messagingSenderId: "29314887189",
  appId: "1:29314887189:web:21a9deb02501ebcef0681c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);