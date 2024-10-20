import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCzbtvTv2yqQzqJfCCBIGosz519GxCCnaE",
  authDomain: "serenity-f747e.firebaseapp.com",
  projectId: "serenity-f747e",
  storageBucket: "serenity-f747e.appspot.com",
  messagingSenderId: "458506997698",
  appId: "1:458506997698:web:6f320e35442b242419105b",
  measurementId: "G-3JHQXGLEBR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

