import { useState } from "react";
import { useAuth } from "../shared/hooks/useAuth.jsx";
import { Input } from "./input.jsx";
import { useNavigate } from "react-router-dom";
import { identifierValidationMessage, passwordValidationMessage, validateIdentifier, validatePassword } from "../shared/validators/validator"
import fotoOn from '../assets/img/fotoON.png'

export const Auth = ({ isVisible, onClose }) => {
  const { login, isLoading } = useAuth()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    identifier: {
      value: "",
      isValid: false,
      showError: false
    },
    password: {
      value: "",
      isValid: false,
      showError: false
    }
  })

  const isSubmitButtonDisabled = !formData.identifier.isValid || !formData.password.isValid

  const handleValueChange = (value, field) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: {
        ...prevData[field],
        value
      }
    }))
  }

  const handleValidationOnBlur = (value, field) => {
    let isValid = false
    switch (field) {
      case "identifier":
        isValid = validateIdentifier(value)
        break
      case "password":
        isValid = validatePassword(value)
        break
      default:
        break
    }
    setFormData((prevData) => ({
      ...prevData,
      [field]: {
        ...prevData[field],
        isValid,
        showError: !isValid
      }
    }))
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    const success = await login(formData.identifier.value, formData.password.value)
    if (success) {
      navigate('/Home')
      onClose()
      window.location.reload(); 
    }
  }

  if (!isVisible) return null;

  return (
    <div className={`body-login ${isVisible ? 'popup-animation' : ''}`}>
      <div className="blur-bg-overlay" onClick={onClose}></div>
      <div className="form-popup">
        <span className="close-btn material-symbols-rounded" onClick={onClose}>close</span>
        <div className="form-box login">
          <div className="form-details">
            <h2>Welcome Back</h2>
            <p className="parraf">Please log in using your personal information to stay connected with us.</p>
          </div>
          <div className="form-content">
            <h2>LOGIN</h2>
            <form onSubmit={handleLogin}>
              <div className="input-field">
                <input type="text" onBlur={(e) => handleValidationOnBlur(e.target.value, "identifier")} onChange={(e) => handleValueChange(e.target.value, "identifier")} />
                <label>Email</label>
              </div>
              <div className="input-field">
                <input type="password" onBlur={(e) => handleValidationOnBlur(e.target.value, "password")} onChange={(e) => handleValueChange(e.target.value, "password")} />
                <label>Password</label>
              </div>
              <button type="submit" disabled={isSubmitButtonDisabled}>Log In</button>
            </form>
            <div className="bottom-link">
              Don't have an account?
              <a id="signup-link">Signup</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
