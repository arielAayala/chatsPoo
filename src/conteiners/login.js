import React,{ useState } from "react"
import { useAuth } from "../context/authContext";
import {useNavigate} from "react-router-dom"
import logo from "../assets/static/logo.png"
import logoGoogle from "../assets/static/google.png"
import logoGitHub from "../assets/static/github.png"
import Footer from "../components/footer"
import {documentUserDB,db} from "../services/firebase"
import { updateDoc,doc} from "firebase/firestore";






export default function Login(){
    
    const [usuario, setUsuario] = useState({
        email:"",
        password:""
    });

    const handleChange = ({target:{name,value}}) => setUsuario({...usuario,[name]:value})

    
    const navigate = useNavigate()
    const {logIn,logInWithGoogle,user,logInWithGitHub} = useAuth()
    const [error=" ", setError] = useState();
        
    
    /* login with email */   

    const handleLogIn = async (e) =>{
        e.preventDefault()
        setError(" ")
        try {
            await logIn(usuario.email,usuario.password);
            await updateDoc(doc(db,"usuarios",user.uid),{
                isOnline:true})
            navigate("/")
        } catch (error) {
            setError(error.code)
            if(error.code === "auth/wrong-password"){
                setError("La contraseña es incorrecta")
            } else if(error.code === "auth/user-not-found"){
                setError("Usuario no encontrado")
            } else if( (error.code === "auth/invalid-email")){
                setError("Email no valido")
            }
        }
    }


    /* login with google popup */

    const handleLogInGoogle = async (e) =>{
        try{
            const usuarioLoginGoogle =await logInWithGoogle()
            documentUserDB(usuarioLoginGoogle)
            await updateDoc(doc(db,"usuarios",usuarioLoginGoogle.user.uid),{
                isOnline: true
            })
            navigate("/")
        }catch(error){
            setError(error)
        }

        
    }

    const handleLogInGitHub = async(e) =>{
        try{
            const usuarioLoginGitHub = await logInWithGitHub()
            documentUserDB(usuarioLoginGitHub)
            await updateDoc(doc(db,"usuarios",usuarioLoginGitHub.user.uid),{
                isOnline:true
        })
        navigate("/")
        }catch(error){
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
                <form onSubmit={handleLogIn}>
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

                    <div className="form-floating">
                        <input 
                            type="password" 
                            id="password" 
                            name= "password"
                            placeholder="******"
                            autoComplete="on"
                            onChange={handleChange}>
                        </input>
                    </div>
                    
                    {error && <p>{error}</p>}
                    <button className="btn btn-lg btn-primary" type="submit">Ingresar</button>
                </form>
                <img onClick={handleLogInGoogle} alt="Google" className="m-3"  width="30" height="30" src={logoGoogle}/>
                <img onClick={handleLogInGitHub} alt="GitHub" className="m-3" width="30" height="30" scr={logoGitHub}/>
            </div>
            <h3 className="h3 mb-3 fw-normal" >¿No te has registrado? <a href={("/register")}>Únete</a></h3>
            <h6 className="h5 mb-2 fw-normal">¿Has olvidado tu contraseña? <a href={("/")}>Recupérala</a></h6> 
        </div>
        <Footer/>
    </div>
        
    )
}