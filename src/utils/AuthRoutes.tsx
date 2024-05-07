import { useContext } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { AuthContext } from '../hooks/Auth/AuthContext'

const AuthRoutes = () => {
   

   const token = localStorage.getItem('userToken');
    
    return(
        token ? <Navigate to="/"/> : <Outlet/>
    )
}

export default AuthRoutes