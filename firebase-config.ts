// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCWF7eAe6EeIqui39xd9Lp5MMocUy4-gcE",
  authDomain: "breakup-aid.firebaseapp.com",
  projectId: "breakup-aid",
  storageBucket: "breakup-aid.firebasestorage.app",
  messagingSenderId: "270130500028",
  appId: "1:270130500028:web:9636783746eecbb6659bb9",
  measurementId: "G-XM0NT8452S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
