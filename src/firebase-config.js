// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD6v3RSeCwCDYiiBDiGHbbfMBPzPxf-vf0",
  authDomain: "spiknubben-dev.firebaseapp.com",
  projectId: "spiknubben-dev",
  storageBucket: "spiknubben-dev.appspot.com",
  messagingSenderId: "572762954800",
  appId: "1:572762954800:web:22bbc2471b06b7bf40a1f5",
  measurementId: "G-R78SXYPL41"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
