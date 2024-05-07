import { useContext } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { AuthContext } from '../hooks/Auth/AuthContext'

const PrivateRoutes = () => {
    const auth= useContext(AuthContext);

   const token = localStorage.getItem('userToken');
    if(!token){
        auth?.setAuthModel(undefined);
    }
    return(
        token ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default PrivateRoutes