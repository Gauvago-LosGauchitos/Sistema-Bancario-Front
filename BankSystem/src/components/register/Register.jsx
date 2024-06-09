import { useState } from "react";
import { useAuth } from "../../shared/hooks/useAuth";
import { Input } from "../InputRegister.jsx";
import { NavBar } from '../Navbar/Navbar.jsx'
import { Footer } from '../Footer/Footer.jsx';
import { useNavigate } from "react-router-dom";
import {
    validateEmail,
    validateUsername,
    validatePassword,
    validateIdentifier,
    validateName,
    validateSurname,
    validateDPI,
    validateAddress,
    validatePhone,
    validateNameOfWork,
    validateMonthlyIncome,
    usernameValidationMessage,
    passwordValidationMessage,
    emailValidationMessage,
    nameValidationMessage,
    surnameValidationMessage,
    identifierValidationMessage,
    DPIValidationMessage,
    addressValidationMessage,
    phoneValidationMessage,
    nameOfWorkValidationMessage,
    monthlyIncomeValidationMessage
} from "../../shared/validators/validator";
import fotoOn from '../../assets/img/fotoON.png';
import './Register.css'

export const Register = () => {
    const { register, isLoading } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: { value: "", isValid: false, showError: false },
        username: { value: "", isValid: false, showError: false },
        DPI: { value: "", isValid: false, showError: false },
        address: { value: "", isValid: false, showError: false },
        phone: { value: "", isValid: false, showError: false },
        email: { value: "", isValid: false, showError: false },
        password: { value: "", isValid: false, showError: false },
        nameOfWork: { value: "", isValid: false, showError: false },
        monthlyIncome: { value: "", isValid: false, showError: false },
        role: { value: "", isValid: false, showError: false }
    });

    const isSubmitButtonDisabled = !Object.values(formData).every(field => field.isValid);

    const handleValueChange = (value, field) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: {
                ...prevData[field],
                value
            }
        }));
    };

    const handleValidationOnBlur = (value, field) => {
        let isValid = false;
        let validationMessage = '';

        switch (field) {
            case "name":
                isValid = validateName(value);
                validationMessage = nameValidationMessage;
                break;
            case "username":
                isValid = validateUsername(value);
                validationMessage = usernameValidationMessage;
                break;
            case "DPI":
                isValid = validateDPI(value);
                validationMessage = DPIValidationMessage;
                break;
            case "address":
                isValid = validateAddress(value);
                validationMessage = addressValidationMessage;
                break;
            case "phone":
                isValid = validatePhone(value);
                validationMessage = phoneValidationMessage;
                break;
            case "email":
                isValid = validateEmail(value);
                validationMessage = emailValidationMessage;
                break;
            case "password":
                isValid = validatePassword(value);
                validationMessage = passwordValidationMessage;
                break;
            case "nameOfWork":
                isValid = validateNameOfWork(value);
                validationMessage = nameOfWorkValidationMessage;
                break;
            case "monthlyIncome":
                isValid = validateMonthlyIncome(value);
                validationMessage = monthlyIncomeValidationMessage;
                break;
            case "role":
                isValid = value !== '';
                validationMessage = 'Role is required';
                break;
            default:
                isValid = true;
                break;
        }

        setFormData((prevData) => ({
            ...prevData,
            [field]: {
                ...prevData[field],
                isValid,
                showError: !isValid
            }
        }));
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        const userData = {
            name: formData.name.value,
            username: formData.username.value,
            DPI: formData.DPI.value,
            address: formData.address.value,
            phone: formData.phone.value,
            email: formData.email.value,
            password: formData.password.value,
            nameOfWork: formData.nameOfWork.value,
            monthlyIncome: formData.monthlyIncome.value
        };

        try {
            const success = await register(userData, formData.role.value);
            if (success) {
                navigate('/AdminPanel');
            }
        } catch (error) {
            if (error.response && error.response.data) {
                alert(error.response.data.message);
            } else {
                console.error("An unexpected error occurred:", error);
            }
        }
    };

    return (
        <div>
            <NavBar />
            <div className="register">

                <section className="containerRegister">
                    <h2 className="title">Register</h2>
                    <form onSubmit={handleRegister} class="form">
                        <div className="column">
                            <div className="input-box">
                                <Input
                                    field="name"
                                    label="Name"
                                    value={formData.name.value}
                                    onChangeHandler={handleValueChange}
                                    type="text"
                                    onBlurHandler={handleValidationOnBlur}
                                    showErrorMessage={formData.name.showError}
                                    validationMessage={nameOfWorkValidationMessage}
                                />
                            </div>
                            <div className="input-box">
                                <Input
                                    field="username"
                                    label="Username"
                                    value={formData.username.value}
                                    onChangeHandler={handleValueChange}
                                    type="text"
                                    onBlurHandler={handleValidationOnBlur}
                                    showErrorMessage={formData.username.showError}
                                    validationMessage={usernameValidationMessage}
                                />
                            </div>
                            <div className="input-box">
                                <Input
                                    field="DPI"
                                    label="DPI"
                                    value={formData.DPI.value}
                                    onChangeHandler={handleValueChange}
                                    type="text"
                                    onBlurHandler={handleValidationOnBlur}
                                    showErrorMessage={formData.DPI.showError}
                                    validationMessage={DPIValidationMessage}
                                />
                            </div>
                        </div>
                        <div className="column">
                            <div className="input-box">
                                <Input
                                    field="address"
                                    label="Address"
                                    value={formData.address.value}
                                    onChangeHandler={handleValueChange}
                                    type="text"
                                    onBlurHandler={handleValidationOnBlur}
                                    showErrorMessage={formData.address.showError}
                                    validationMessage={addressValidationMessage}
                                />
                            </div>
                            <div className="input-box">
                                <Input
                                    field="phone"
                                    label="Phone Number"
                                    value={formData.phone.value}
                                    onChangeHandler={handleValueChange}
                                    type="text"
                                    onBlurHandler={handleValidationOnBlur}
                                    showErrorMessage={formData.phone.showError}
                                    validationMessage={phoneValidationMessage}
                                />
                            </div>
                            <div className="input-box">
                                <Input
                                    field="email"
                                    label="Email"
                                    value={formData.email.value}
                                    onChangeHandler={handleValueChange}
                                    type="text"
                                    onBlurHandler={handleValidationOnBlur}
                                    showErrorMessage={formData.email.showError}
                                    validationMessage={emailValidationMessage}
                                />
                            </div>

                        </div>
                        <div className="column">
                            <div class="input-box">
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
                            <div className="input-box">
                                <Input
                                    field="nameOfWork"
                                    label="Name of Work"
                                    value={formData.nameOfWork.value}
                                    onChangeHandler={handleValueChange}
                                    type="text"
                                    onBlurHandler={handleValidationOnBlur}
                                    showErrorMessage={formData.nameOfWork.showError}
                                    validationMessage={nameOfWorkValidationMessage}
                                />
                            </div>
                        </div>
                        <div className="column">
                            <div className="input-box">
                                <Input
                                    field="monthlyIncome"
                                    label="Monthly Income"
                                    value={formData.monthlyIncome.value}
                                    onChangeHandler={handleValueChange}
                                    type="text"
                                    onBlurHandler={handleValidationOnBlur}
                                    showErrorMessage={formData.monthlyIncome.showError}
                                    validationMessage={monthlyIncomeValidationMessage}
                                />
                            </div>
                            <div className="input-box">
                                <label>Role</label>
                                <div className="select-box">
                                    <select
                                        id="role"
                                        value={formData.role.value}
                                        onChange={(e) => handleValueChange(e.target.value, 'role')}
                                        onBlur={(e) => handleValidationOnBlur(e.target.value, 'role')}
                                    >
                                        <option value="" disabled>Select a role</option>
                                        <option value="ADMIN">Admin</option>
                                        <option value="CLIENT">Client</option>
                                    </select>
                                    {formData.role.showError && <span className="error-message">Role is required</span>}
                                </div>
                            </div>
                        </div>
                        <button disabled={isSubmitButtonDisabled || isLoading} >Submit</button>
                    </form>
                </section>
            </div>
            <Footer />
        </div>
    );
};
