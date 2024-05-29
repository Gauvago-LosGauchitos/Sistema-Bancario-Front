import { Login } from '../../components/Login';
import { Register } from '../../components/Register';
import { useState } from 'react';
import './AuthPage.css'

export const AuthPage = () => {

  const [isLogin, setIsLogin] = useState(true)
  const [isRegister, setIsRegister] = useState(false)
  const handleAuthPage = ()=>{
    setIsLogin((prev)=> !prev)
    setIsRegister((prev)=> !prev)
  }
  
  return (
    <div>
      <Login />
      <Register />
    </div>
  );
};