// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCl0Zrmxp3u_GrFT99FF0wvlZvuX_hXVoo",
  authDomain: "fit5032-assignment-48a6d.firebaseapp.com",
  projectId: "fit5032-assignment-48a6d",
  storageBucket: "fit5032-assignment-48a6d.appspot.com",
  messagingSenderId: "445643052474",
  appId: "1:445643052474:web:2f7cfa9fe227992317b983"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const db = getFirestore();
export default db;