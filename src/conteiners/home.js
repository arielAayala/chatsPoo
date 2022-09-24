
import Header from "../components/header"
import Footer from "../components/footer"
import{collection,query,onSnapshot,where,addDoc, Timestamp,orderBy} from "firebase/firestore"
import { db } from "../services/firebase"
import { useState, useEffect } from "react"
import { useAuth } from "../context/authContext"
import User from "../components/User"
import "../assets/media/app.css"
import MessageForm from "../components/messagesForm"
import Message from "../components/message"


export default function Home(){
    const [users, setUsers] = useState([])
    const{user}= useAuth()
    const [chat, setChat] = useState("");
    const [text, setText] = useState("");
    const [msgs, setMsgs] = useState([]);


    const user1 = user.uid
    const user2 = chat.uid
    const idChat = user1 > user2 ? `${user1 + user2}` : `${user2+user1}`


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
    }, [user.uid])

    const selectUser = (user) =>{
        setChat(user)

        const user2 = user.uid
        const idChat = user1 > user2 ? `${user1 + user2}` : `${user2+user1}`
        const msgsRef = collection(db,"messages",idChat,"chat")
        const q = query(msgsRef,orderBy("createdAt","asc"))
        onSnapshot(q,querySnapshot =>{
            let msgs = []
            querySnapshot.forEach(doc =>{
                msgs.push(doc.data())
            })
        setMsgs(msgs)
        })
    } 


    const handleSumbit = async(e) =>{
        e.preventDefault()
        await addDoc(collection(db,"messages",idChat,"chat"),{
            text,
            from:user1,
            to:user2,
            createdAt: Timestamp.fromDate(new Date())},
        setText(""))
    }



    return(

        <div>
            <Header></Header>
            <div className="home_container">
                <div className="users_container">
                    {users.map((user) => <User key={user.uid} user={user} selectUser={selectUser}/>)}
                </div>
                <div className="messages_container">
                    {chat ?
                    (
                    <>
                    <div className="messages_user">
                        <h3>{chat.displayName || chat.email}</h3>
                    </div>
                    <div className="messages">
                        {msgs.length ? 
                        msgs.map((msg,i)=> <Message key={i} msg={msg} user1={user1}/>):null}
                    </div>
                    <MessageForm handleSubmit={handleSumbit} text={text} setText={setText} />
                    </>)
                    : 
                    (<h3 className="no_conv">Seleccionar chat</h3>)}
                </div>
            </div>
            <Footer></Footer>
        </div>
            

        
    )
}

