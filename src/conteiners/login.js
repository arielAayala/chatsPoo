import { useState } from "react"
import { useAuth } from "../context/authContext";
import {useNavigate} from "react-router-dom"
import logo from "../assets/static/logo.png"
import Footer from "../components/footer"

export default function Login(){
    
    const [user, setUser] = useState({
        email:"",
        password:""
    });

    const handleChange = ({target:{name,value}}) => {
       setUser({...user,[name]:value})
    }
    
    const navigate = useNavigate()
    const {logIn} = useAuth()
    const [error=" ", setError] = useState();
        
    
    const handleLogIn = async (e) =>{
        e.preventDefault()
        setError(" ")
        try {
            await logIn(user.email,user.password); 
            navigate("/")
        } catch (error) {
            if(error.code === "auth/wrong-password"){
                setError("La contraseña es incorrecta")
            } else if(error.code === "auth/user-not-found"){
                setError("Usuario no encontrado")
            } 
        }
    }

    const handleGoRegister = () => {navigate("/register")}

    return(
    <div>
        <nav class="navbar navbar-expand-lg bg-black">
            <div class="container-fluid">
                <a class="navbar-brand text-light" href="/">Chat'sApp</a>  
            </div>
        </nav>
        <div class="text-center my-5">
            <div class="form-signin w-100 m-auto">
                <form onSubmit={handleLogIn}>
                    <img class="mb-4" src={logo} width="72" height="57" alt="logo"/>
                    <h1 class="h3 mb-3 fw-normal">Ingresar</h1>
                    <div class="form-floating">
                        <input 
                            type="email" 
                            name="email" 
                            placeholder= "E-mail"
                            onChange={handleChange}>    
                        </input>
                    </div>

                    <div class="form-floating">
                        <input 
                            type="password" 
                            id="password" 
                            name= "password"
                            placeholder="******"
                            onChange={handleChange}>
                        </input>
                    </div>
                    
                    {error && <p>{error}</p>}
                    <button class=" btn btn-lg btn-primary" type="submit">Ingresar</button>
                </form>
            </div>
            <button class="btn btn-lg btn-primary mt-2" onClick={handleGoRegister}>Unete</button>
        </div>
        <Footer/>
    </div>
        
    )
}