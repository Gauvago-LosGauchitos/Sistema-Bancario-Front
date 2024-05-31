import { useState } from "react";
import { useAuth } from "../shared/hooks/useAuth.jsx";
import { Input } from "./input.jsx";
import { useNavigate } from "react-router-dom";
import { identifierValidationMessage, passwordValidationMessage, validateIdentifier, validatePassword } from "../shared/validators/validator"
import fotoOn from '../assets/img/fotoON.png'

export const Auth = () => {
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
  }
  }


  return (
    <div className="body-login">
      <div className='container'>
        <div className="signin-signup">
          <form onSubmit={handleLogin} className="sign-in-form">
            <h2 className="title">Sign in</h2>
            <div className="input-field">
              <Input
                field="identifier"
                label="Email or Username"
                value={formData.identifier.value}
                onChangeHandler={handleValueChange}
                type="text"
                onBlurHandler={handleValidationOnBlur}
                showErrorMessage={formData.identifier.showError}
                validationMessage={identifierValidationMessage}
              />
            </div>
            <div className="input-field">
              <Input
                field="password"
                label="Password"
                value={formData.password.value}
                onChangeHandler={handleValueChange}
                type="password"
                onBlurHandler={handleValidationOnBlur}
                showErrorMessage={formData.password.showError}
                validationMessage={passwordValidationMessage}
              />
            </div>
            <button disabled={isSubmitButtonDisabled} type="submit" className="btn">
              Login
            </button>
          </form>
        </div>
        <div className="panels-container">
          <img className="imgPanel" src={fotoOn} />

        </div>


      </div>
    </div>
  );
};

