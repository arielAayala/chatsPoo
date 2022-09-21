import {createContext, useContext, useEffect,useState} from "react"
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged,signOut,GoogleAuthProvider,signInWithPopup} from "firebase/auth"
import { auth } from "../services/firebase"


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



    /* verficar login */    
    useEffect(()=>{
        onAuthStateChanged(auth,currentUser =>{
            setUser(currentUser)
            setLoading(false)
        })
    },[])

    return <authContext.Provider value = {{signUp, logIn, user,logOut,loading , logInWithGoogle}}>{children}</authContext.Provider> 
}