// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration


const firebaseConfig = {
    apiKey: "AIzaSyAVm9fS7NYgnW9HOFG88yOyzCLFvVsCUQw",
    authDomain: "kosmo-96bbe.firebaseapp.com",
    databaseURL: "https://kosmo-96bbe-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "kosmo-96bbe",
    storageBucket: "kosmo-96bbe.appspot.com",
    messagingSenderId: "42428002874",
    appId: "1:42428002874:web:ed2d94fc1638f4bf75bb03"
  };
  
// Initialize Firebase
export const app = initializeApp(firebaseConfig);