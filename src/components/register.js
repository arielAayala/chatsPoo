import { useState } from "react"
import { useAuth } from "../context/authContext";
import {useNavigate} from "react-router-dom"
import logo from "../assets/static/logo.png"
import Header from "../no se si sirve/header";
import Footer from "../no se si sirve/footer"

export default function Register(){
    
    const [user, setUser] = useState({
        email:"",
        password:""
    });

    const handleChange = ({target:{name,value}}) => {
       setUser({...user,[name]:value})
    }
    
    const navigate = useNavigate()
    const {signUp} = useAuth()
    const [error=" ", setError] = useState();
        
    
    const handleSubmit = async (e) =>{
        e.preventDefault()
        setError(" ")
        try {
            await signUp(user.email,user.password); 
            navigate("/")
        } catch (error) {
            setError(error.code)
            if(error.code === "auth/email-already-in-use"){
                setError("El correo ya esta registrado")
            } else if(error.code === "auth/weak-password"){
                setError("La contraseña debe tener minimo 6 caracteres")
            } else if( error.code === "auth/invalid-email"){
                setError("El email no es valido")
            }
        }
    }

    return(
    <div>
        <Header/>
        <div class="text-center my-5">
            <div class="form-signin w-100 m-auto">
                <form onSubmit={handleSubmit}>
                    <img class="mb-4" src={logo} width="72" height="57" alt="logo"/>
                    <h1 class="h3 mb-3 fw-normal">Registrate</h1>
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
                    <button class=" btn btn-lg btn-primary" type="submit">Registrarse</button>
                </form>
            </div>
        </div>
        <Footer/>
    </div>
        
    )
}