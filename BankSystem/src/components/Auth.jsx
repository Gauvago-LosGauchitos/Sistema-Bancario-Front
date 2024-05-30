import { useState } from "react";
import { useAuth } from "../shared/hooks/useAuth.jsx";
import { Input } from "./Input.jsx";
import { identifierValidationMessage, passwordValidationMessage, validateIdentifier, validatePassword } from "../shared/validators/validator"

export const Auth = () => {
  const {login, isLoading} = useAuth()

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

  const handleValueChange = (value, field) =>{
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
    switch(field){
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
  }
 

  return (
    <div>
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
          <form action="" className="sign-up-form">
            <h2 className="title">Sign up</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Username" />
            </div>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input type="text" placeholder="Email" />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Password" />
            </div>
            <input type="submit" value="Sign up" className="btn" />
          </form>
        </div>
        <div className="panels-container">
          
        </div>
      </div>
    </div>
  );
};

