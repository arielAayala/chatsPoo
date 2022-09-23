// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getFirestore, setDoc,doc} from "firebase/firestore"


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBxjkn5ps-770xQUPIDrBOmDX3Lu6UbUsU",
  authDomain: "chat-poo-94425.firebaseapp.com",
  databaseURL: "https://chat-poo-94425-default-rtdb.firebaseio.com",
  projectId: "chat-poo-94425",
  storageBucket: "chat-poo-94425.appspot.com",
  messagingSenderId: "1054440467402",
  appId: "1:1054440467402:web:96e058b4d84825faa23d33",
  measurementId: "G-7ZW21DDYC1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)

export const documentUserDB = async (userLogin) =>{
  if (!userLogin) return
  await setDoc(doc(db,"usuarios",userLogin.user.uid),{
    uid: userLogin.user.uid,
    displayName: userLogin.user.displayName,
    email:userLogin.user.email,
    photoURL:userLogin.user.photoURL,
    isOnline: false
  }) 
}