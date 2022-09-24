import { useAuth } from "../context/authContext"
import { updateDoc,doc } from "firebase/firestore"
import { db } from "../services/firebase"
import React from "react"
export default function Header(){
  const {logOut,user} = useAuth()

  const handleLogOut = async ()=>{
      await updateDoc(doc(db,"usuarios",user.uid ),{
        isOnline: false
    })
    await logOut()
  }



    return(
      <div>
        <nav className="navbar navbar-expand-lg bg-black">
          <div className="container-fluid">
            <a className="navbar-brand text-light" href="/">Chat'sApp
            </a>
              <div className="justify-content-end" id="navbarNav">
                    <button className="btn btn-outline-light" onClick={handleLogOut}>Salir</button>
              </div>
          </div>
        </nav>
      </div>
    )
  } 