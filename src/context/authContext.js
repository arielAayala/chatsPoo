import {createContext, useContext, useEffect,useState} from "react"
import {createUserWithEmailAndPassword, sendPasswordResetEmail,GithubAuthProvider,signInWithEmailAndPassword, onAuthStateChanged,signOut,GoogleAuthProvider,signInWithPopup} from "firebase/auth"
import { auth } from "../services/firebase"
import React from "react";

export const authContext = createContext()

export const useAuth = () =>{
    const context = useContext(authContext)
    return context
}

export function AuthProvider({children}){

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
    /* email and password */
    
    const signUp = (email,password) => createUserWithEmailAndPassword(auth,email,password)
    
    const logIn = (email,password) => signInWithEmailAndPassword(auth,email,password)

    const logOut = () =>{signOut(auth)}

    /* google */

    const logInWithGoogle = () => {
        const googleProvider = new GoogleAuthProvider()
        return signInWithPopup(auth,googleProvider)
    }

    const logInWithGitHub =() =>{
        const gitHubProvider = new GithubAuthProvider()
        return signInWithPopup(auth,gitHubProvider)
    } 

    const resetPassword = (email)=> sendPasswordResetEmail(auth,email)

    /* verficar login */    
    useEffect(()=>{
        onAuthStateChanged(auth,currentUser =>{
            setUser(currentUser)
            setLoading(false)
        })
    },[])

    return <authContext.Provider value = {{signUp, logIn, user,logOut,loading , logInWithGoogle,logInWithGitHub,resetPassword}}>{children}</authContext.Provider> 
}