// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_DOMAIN_KEY,
  databaseURL: process.env.REACT_APP_URL_KEY,
  projectId: process.env.REACT_APP_PROJECTID_KEY,
  storageBucket: process.env.REACT_APP_STORAGE_KEY,
  messagingSenderId: process.env.REACT_APP_MESSAGINGID_KEY,
  appId: process.env.REACT_APP_APPID_KEY,
  measurementId: process.env.REACT_APP_MEASUREMENTID_KEY,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };
