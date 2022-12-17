// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC4sLRn74C3RjhxoYwa_oinJqgVaGCVjx8",
  authDomain: "simpli-rent.firebaseapp.com",
  projectId: "simpli-rent",
  storageBucket: "simpli-rent.appspot.com",
  messagingSenderId: "542860710739",
  appId: "1:542860710739:web:372c33eb327fb1ca9b87a6",
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
