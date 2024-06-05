import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthPage } from './src/Pages/Auth/AuthPage';
import { HomePage } from './src/components/HomePage/HomePage';
import {Transfer} from './src/components/Transfer/Transfer.jsx'
import { Deposit } from './src/components/Deposit/Deposit.jsx';
import { Buyed } from './src/components/Buyed/Buyed.jsx';
import { AdminPanel } from './src/components/adminPanel/AdminPanel.jsx';



export const AppRoutes = () => {
  return (
    <Router>
        <Routes>
        <Route path="/register" element={<AuthPage  />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/Home" element={<HomePage />} />
        <Route path="/" element={<Navigate to="/register" />} />
        <Route path='/Transfer' element={<Transfer />} />
        <Route path='/Deposit' element={<Deposit />} />
        <Route path='/Buyed' element={<Buyed />} />
        <Route path='/AdminPanel' element={<AdminPanel/>}/>

        </Routes>
    </Router>
  )
}


