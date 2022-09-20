import { useAuth } from "../context/authContext"
export default function Header(){
  const {logOut} = useAuth()

  const handleLogOut = async ()=>{
      await logOut()
  }

  const handleChats = () =>{}

    return(
      <div>
        <nav class="navbar navbar-expand-lg bg-black">
          <div class="container-fluid">
            <a class="navbar-brand text-light" href="/">Chat'sApp
            </a>
            <button class="navbar-toggler bg-secondary" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
              <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
                <ul class="navbar-nav ">
                  <li class="nav-item">
                    <button class="btn btn-outline-light" onClick={handleLogOut}>Salir</button>
                  </li>
                  {/* <li class="nav-item">
                    <button class="btn btn-outline-light" onClick={handleChats}>Chats</button>
                  </li> */}
                </ul>
              </div>
          </div>
        </nav>
      </div>
    )
  } 