// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyASvujKnRCR_b3eqHKR1EElrGCmFmYkAY4",
  authDomain: "realstate-marketplace.firebaseapp.com",
  projectId: "realstate-marketplace",
  storageBucket: "realstate-marketplace.appspot.com",
  messagingSenderId: "858700076512",
  appId: "1:858700076512:web:36d8e2d650e9c424828785",
  measurementId: "G-FHXY8YFBB3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db =getFirestore();