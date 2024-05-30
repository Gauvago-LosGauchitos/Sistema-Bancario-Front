import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthPage } from './src/Pages/Auth/AuthPage';
import { HomePage } from './src/components/HomePage/HomePage';


export const AppRoutes = () => {
  return (
    <Router>
        <Routes>
        <Route path="/register" element={<AuthPage  />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/Home" element={<HomePage />} />
        <Route path="/" element={<Navigate to="/register" />} />

        </Routes>
    </Router>
  )
}


