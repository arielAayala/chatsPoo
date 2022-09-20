import {useAuth} from "../context/authContext"
import { Navigate } from "react-router-dom"
import Footer from "../components/footer"

export default function ProtectedRoute({children}){
    const {user, loading} = useAuth()

    if (loading) return (
        <div>
            <nav class="navbar navbar-expand-lg bg-black">
                <div class="container-fluid">
                    <a class="navbar-brand text-light" href="/">Chat'sApp</a>  
                </div>
            </nav>
            <div class="text-center my-5">
                <h1 class="h3 mb-3 fw-normal">Cargando...</h1>
            </div>
            <Footer></Footer>
        </div>
    )

    if (!user) return <Navigate to="/login"/>

    return <>{children}</>
}