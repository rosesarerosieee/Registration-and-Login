// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getDatabase} from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBDEEjwKlw6FVU7o0F2Jidqw8jzzNwFdMI",
  authDomain: "registration-and-login-3da65.firebaseapp.com",
  databaseURL: "https://registration-and-login-3da65-default-rtdb.firebaseio.com",
  projectId: "registration-and-login-3da65",
  storageBucket: "registration-and-login-3da65.appspot.com",
  messagingSenderId: "827574327856",
  appId: "1:827574327856:web:4815948ecf383f525d6bf5",
  measurementId: "G-LB3PXEMP00"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export {db};