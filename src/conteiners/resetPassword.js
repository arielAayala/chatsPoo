import React,{ useState } from "react"
import { useAuth } from "../context/authContext";
import logo from "../assets/static/logo.png"
import Footer from "../components/footer"







export default function ResetPassword(){
    
    const [usuario, setUsuario] = useState({
        email:""
    });

    const handleChange = ({target:{name,value}}) => setUsuario({...usuario,[name]:value})

    
    const {resetPassword} = useAuth()
    const [error=" ", setError] = useState();
        
    
    /* reset password */   
    const handleResetPassword = async(e) => {
        e.preventDefault()
        try {
            await resetPassword(usuario.email)
            setError("Se ha enviado un link a tu correo")
        } catch (error) {
            setError(error.code)
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
                <form onSubmit={handleResetPassword}>
                    <img className="mb-4" src={logo} width="72" height="57" alt="logo"/>
                    <h1 className="h3 mb-3 fw-normal">Ingresar</h1>
                    <div className="form-floating">
                        <input 
                            type="email" 
                            name="email" 
                            placeholder= "E-mail"
                            autoComplete="on"
                            onChange={handleChange}>    
                        </input>
                    </div>

                    
                    {error && <p>{error}</p>}
                    <button className="btn btn-lg btn-primary" type="submit">Recuperar</button>
                </form>
            </div>
        </div>
        <Footer/>
    </div>
        
    )
}