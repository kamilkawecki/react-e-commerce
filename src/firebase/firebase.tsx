// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAS04-E2TM-bsK2bgdvzfcxlITD1m8lasc",
  authDomain: "react-e-commerce-da714.firebaseapp.com",
  databaseURL: "https://react-e-commerce-da714-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "react-e-commerce-da714",
  storageBucket: "react-e-commerce-da714.appspot.com",
  messagingSenderId: "132811197275",
  appId: "1:132811197275:web:cad67f17a1bd977e2ee87e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);