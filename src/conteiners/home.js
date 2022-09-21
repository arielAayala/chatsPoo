
import Header from "../components/header"
import Footer from "../components/footer"
import{collection,getDocs,query} from "firebase/firestore"
import { useAuth } from "../context/authContext"
import { db } from "../services/firebase"

export default function Home(){
    const {user} = useAuth()

    const loadUsers = async () =>{
        const lstUsuario = query(collection(db,"usuarios"))
        const querySnapshot = await getDocs(lstUsuario)
        querySnapshot.forEach((doc) =>{
            console.log(doc.id)
        }) 
    } 
    
    if (user) {
        console.log(user)
        loadUsers()
    }

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

