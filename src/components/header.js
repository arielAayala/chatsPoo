import { useAuth } from "../context/authContext"
import { updateDoc,doc } from "firebase/firestore"
import { db } from "../services/firebase"

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
            <button className="navbar-toggler bg-secondary" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
              <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                <ul className="navbar-nav ">
                  <li className="nav-item">
                    <button className="btn btn-outline-light" onClick={handleLogOut}>Salir</button>
                  </li>
                </ul>
              </div>
          </div>
        </nav>
      </div>
    )
  } 