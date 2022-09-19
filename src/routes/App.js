import { Route,Routes } from "react-router-dom"
import Home from "../components/home"
import Login from "../components/login"
import Register from "../components/register"
import { AuthProvider } from "../context/authContext"

export default function App(){
    return(
        <AuthProvider>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>} />
                <Route path="/Register" element={<Register/>}/>
            </Routes>
        </AuthProvider>
    )
}
