import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthPage } from './src/Pages/Auth/AuthPage';
import { HomePage } from './src/components/HomePage/HomePage';
import { Transfer } from './src/components/Transfer/Transfer.jsx';
import { Deposit } from './src/components/Deposit/Deposit.jsx';
import { Buyed } from './src/components/Buyed/Buyed.jsx';
import { AdminPanel } from './src/components/adminPanel/AdminPanel.jsx';
import { About } from './src/components/About/About.jsx';
import { History } from './src/components/history/History.jsx';
import { Perfil } from './src/components/Perfil/Perfil.jsx';
import {Register} from './src/components/register/Register.jsx'
import { Services } from './src/components/Service/Service.jsx';



export const AppRoutes = () => {
  return (
    <Router>
        <Routes>
        <Route path="/Home" element={<HomePage />} />
        <Route path="/" element={<Navigate to="/Home" />} />
        <Route path='/Transfer' element={<Transfer />} />
        <Route path='/Deposit' element={<Deposit />} />
        <Route path='/Buyed' element={<Buyed />} />
        <Route path='/AdminPanel' element={<AdminPanel/>}/>
        <Route path='/About' element={<About />} />
        <Route path='/History' element={<History />} />
        <Route path='/Perfil' element={<Perfil/>} />
        <Route path='/register' element={<Register />} />

        </Routes>
    </Router>
  )
}
