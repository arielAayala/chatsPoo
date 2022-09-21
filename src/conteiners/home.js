
import Header from "../components/header"
import Footer from "../components/footer"
import{collection,getDocs,query} from "firebase/firestore"
import { useAuth } from "../context/authContext"
import { db } from "../services/firebase"
import { useState, useEffect } from "react"
export default function Home(){
    const {user} = useAuth()

    const [users, setUsers] = useState([])

    useEffect(() => {
        const lstUsuario = query(collection(db,"usuarios"))
        const querySnapshot = getDocs(lstUsuario)
        let users = []
        querySnapshot.forEach((doc) =>{
            users.push(doc.data())
        })
        return 
    }, []);
   

    return(
        <div>
            <Header></Header>
            <div className=" text-center my-5">
                hola
            </div>
            <Footer></Footer>
        </div>
    )
}

