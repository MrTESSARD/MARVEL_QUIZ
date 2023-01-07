// import app from "firebase/app";//8
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";//9
import { getAuth } from "firebase/auth";//*


// import 'firebase/auth'
// import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const config = {
  apiKey: "AIzaSyC0F6i-hNu0EIOkoK3Z87oLe4r4fJtY1Ak",
  authDomain: "marvel-quiz-6d041.firebaseapp.com",
  projectId: "marvel-quiz-6d041",
  storageBucket: "marvel-quiz-6d041.appspot.com",
  messagingSenderId: "456851384002",
  appId: "1:456851384002:web:b6be5e0a8fb8d7d76e3d5b"
};

// // inscription
// signupUser=(email, password) =>{
//     createUserWithEmailAndPassword

// }

// // Connexion
// loginUser = (email, password) =>{
//     signInWithEmailAndPassword
//     signoutUser = () => signOut()

// }

// Initialize Firebase
const app = initializeApp(config);
export const auth = getAuth(app);