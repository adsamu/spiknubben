import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD6v3RSeCwCDYiiBDiGHbbfMBPzPxf-vf0",
  authDomain: "spiknubben-dev.firebaseapp.com",
  projectId: "spiknubben-dev",
  storageBucket: "spiknubben-dev.appspot.com",
  messagingSenderId: "572762954800",
  appId: "1:572762954800:web:22bbc2471b06b7bf40a1f5",
  measurementId: "G-R78SXYPL41"
};

const app = initializeApp(firebaseConfig);
if (typeof window !== "undefined") getAnalytics(app);
export const db = getFirestore(app);

if (import.meta.env.DEV) {
  connectFirestoreEmulator(db, window.location.hostname, 8080);
}
