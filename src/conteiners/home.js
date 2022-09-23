
import Header from "../components/header"
import Footer from "../components/footer"
import{collection,query,onSnapshot,where} from "firebase/firestore"
import { db } from "../services/firebase"
import { useState, useEffect } from "react"
import { useAuth } from "../context/authContext"
import User from "../components/User"
import "../assets/media/app.css"


export default function Home(){
    const [users, setUsers] = useState([])
    const{user}=useAuth()
    const [chat, setChat] = useState("");

    const selectUser = (user) =>{
        setChat(user)
    } 

    useEffect(() => {
        const userRef = collection(db,"usuarios")
        const q = query(userRef,where("uid","not-in",[user.uid]))
        const onsub = onSnapshot(q,(querySnapshot) =>{
            let lstUser = []
            querySnapshot.forEach((doc) => {
                lstUser.push(doc.data())
            })
            setUsers(lstUser)
        })
        return () => onsub() 
    }, [])

    

    return(

        <div>
            <Header></Header>
            <div className="home_container">
                <div className="users_container">
                    {users.map((user) => <User key={user.uid} user={user} selectUser={selectUser}/>)}
                </div>
                <div className="messages_container">
                    {chat ? <div className="messages_user">
                            <h3>{chat.displayName || chat.email}</h3>
                        </div>: <h3 className="no_conv">Seleccionar chat</h3>}
                </div>
            </div>
            <Footer></Footer>
        </div>
            

        
    )
}

