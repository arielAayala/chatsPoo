import {createContext, useContext, useEffect,useState} from "react"
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged,signOut} from "firebase/auth"
import { auth } from "../services/firebase"


export const authContext = createContext()

export const useAuth = () =>{
    const context = useContext(authContext)
    return context
}

export function AuthProvider({children}){

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const signUp = (email,password) => createUserWithEmailAndPassword(auth,email,password)
    
    const logIn = (email,password) => signInWithEmailAndPassword(auth,email,password)

    const logOut = () =>{signOut(auth)}

    useEffect(()=>{
        onAuthStateChanged(auth,currentUser =>{
            setUser(currentUser)
            setLoading(false)
        })
    },[])

    return <authContext.Provider value = {{signUp, logIn, user,logOut,loading}}>{children}</authContext.Provider> 
}