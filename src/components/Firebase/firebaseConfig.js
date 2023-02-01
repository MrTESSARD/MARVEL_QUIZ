// import app from "firebase/app";//8
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";//9
import { getAuth } from "firebase/auth";//*
import { getFirestore, doc, setDoc } from "firebase/firestore"; //9


// import 'firebase/auth'
// import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
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

// export const firestore = getFirestore()
export const firestore = getFirestore();
export const user = uid => doc(firestore, `users/${uid}`)
// setDoc(user(id))