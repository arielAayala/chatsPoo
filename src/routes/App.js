import React from "react"
import { Route,Routes } from "react-router-dom"
import Home from "../conteiners/home"
import Login from "../conteiners/login"
import Register from "../conteiners/register"
import { AuthProvider } from "../context/authContext"
import  ProtectedRoute from "../conteiners/protectedRoute"
import ResetPassword from "../conteiners/resetPassword"


export default function App(){
    return(
        <AuthProvider>
            <Routes>
                <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
                <Route path="/login" element={<Login/>} />
                <Route path="/register" element={<Register/>}/>
                <Route path="/resetPassword" element={<ResetPassword/>}/>
            </Routes>
        </AuthProvider>
    )
}
