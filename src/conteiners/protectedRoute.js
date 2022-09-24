import {useAuth} from "../context/authContext"
import { Navigate } from "react-router-dom"
import Footer from "../components/footer"
import React from "react";
export default function ProtectedRoute({children}){
    const {user, loading} = useAuth()

    if (loading) return (
        <div>
            <nav className="navbar navbar-expand-lg bg-black">
                <div className="container-fluid">
                    <a className="navbar-brand text-light" href="/">Chat'sApp</a>  
                </div>
            </nav>
            <div className="text-center my-5">
                <h1 className="h3 mb-3 fw-normal">Cargando...</h1>
            </div>
            <Footer></Footer>
        </div>
    )

    if (!user){
        return <Navigate to="/login"/>
    } 

    return <>{children}</>
}