import { useState } from "react"
import { useAuth } from "../context/authContext";
import {useNavigate} from "react-router-dom"
import logo from "../assets/static/logo.png"
import Footer from "../components/footer"
import { documentUserDB } from "../services/firebase";


export default function Register(){
    
    const [usuario, setusuario] = useState({
        email:"",
        password:""
    });

    const handleChange = ({target:{name,value}}) => {
       setusuario({...usuario,[name]:value})
    }
    
    const navigate = useNavigate()
    const {signUp} = useAuth()
    const [error=" ", setError] = useState();
        
    
    const handleSubmit = async (e) =>{
        e.preventDefault()
        setError(" ")
        try {
            const usuariosignUp= await signUp(usuario.email,usuario.password);
            documentUserDB(usuariosignUp)
            navigate("/login")
        } catch (error) {
            if(error.code === "auth/email-already-in-use"){
                setError("El correo ya esta registrado")
            } else if(error.code === "auth/weak-password"){
                setError("La contraseña debe tener minimo 6 caracteres")
            } else if( error.code === "auth/invalid-email"){
                setError("El email no es valido")
            }
            console.log(error)
        }
    }

    return(
    <div>
        <nav className="navbar navbar-expand-lg bg-black">
            <div className="container-fluid">
                <a className="navbar-brand text-light" href="/">Chat'sApp</a>  
            </div>
        </nav>
        <div className="text-center my-5">
            <div className="form-signin w-100 m-auto">
                <form onSubmit={handleSubmit}>
                    <img className="mb-4" src={logo} width="72" height="57" alt="logo"/>
                    <h1 className="h3 mb-3 fw-normal">Registrate</h1>
                    <div className="form-floating">
                        <input 
                            type="email" 
                            name="email" 
                            placeholder= "E-mail"
                            onChange={handleChange}>    
                        </input>
                    </div>

                    <div className="form-floating">
                        <input 
                            type="password" 
                            id="password" 
                            name= "password"
                            placeholder="******"
                            onChange={handleChange}>
                        </input>
                    </div>
                    
                    {error && <p>{error}</p>}
                    <button className=" btn btn-lg btn-primary" type="submit">Registrarse</button>
                </form>
            </div>
        </div>
        <Footer/>
    </div>
        
    )
}