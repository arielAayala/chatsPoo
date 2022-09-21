import { useAuth } from "../context/authContext"
export default function Header(){
  const {logOut} = useAuth()

  const handleLogOut = async ()=>{
      await logOut()
  }

  /* const handleChats = () =>{} */

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
                  {/* <li className="nav-item">
                    <button className="btn btn-outline-light" onClick={handleChats}>Chats</button>
                  </li> */}
                </ul>
              </div>
          </div>
        </nav>
      </div>
    )
  } 