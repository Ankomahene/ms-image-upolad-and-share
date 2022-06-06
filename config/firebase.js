import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBd3mqGVigNa3NKClvhNJQUz2mJuUHxFkw",
  authDomain: "ms-image-share.firebaseapp.com",
  projectId: "ms-image-share",
  storageBucket: "ms-image-share.appspot.com",
  messagingSenderId: "998179265708",
  appId: "1:998179265708:web:0045b0325d6f9cbaa8d309",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getFirestore(app);

export { database };
