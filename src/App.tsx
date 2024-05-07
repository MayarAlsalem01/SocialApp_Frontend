import React, { useContext, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Login, ProfilePage, Register } from './Pages';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Index from './Pages/Home';
import { jwtDecode } from 'jwt-decode';
import { AuthProvider } from './hooks/Auth/AuthContext';
import { Navbar } from './Components';
import PrivateRoutes from './utils/PrivateRoutes ';
import AuthRoutes from './utils/AuthRoutes';
import TNavBar from './Components/TailwindNavbar/TNavBar';



function App() {

  return (

    <div >
      <AuthProvider>
        <BrowserRouter>
        <TNavBar />
          <Routes>
            <Route element={<PrivateRoutes/>} >
              <Route path='/' element={<Index />} />
              <Route path='/profile' element={<ProfilePage/>}/>
            </Route>
            <Route element={<AuthRoutes/>}>

            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            </Route>
            
          </Routes>
        </BrowserRouter>
      </AuthProvider>


    </div>
  );
}

export default App;
