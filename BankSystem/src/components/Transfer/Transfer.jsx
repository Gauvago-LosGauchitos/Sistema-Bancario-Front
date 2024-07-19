import { NavBar } from "../Navbar/Navbar"
import { Footer } from "../Footer/Footer"
import { Spinner } from "../../assets/spinner/Spinner"
import { useState, useEffect } from "react"
import { useTransfer } from "../../shared/hooks/useTransfer"
import { Input } from "../input"
import Swal from "sweetalert2"
import {
    validateAmount,
    validateAccountNumber,
    amountValidationMessage,
    accountNumberValidationMessage
} from "../../shared/validators/validator"
import "./Transfer.css"
import { useNavigate } from 'react-router-dom'; // Ajusta la importación según tu librería de enrutamiento

export const Transfer = () => {
    const [loading, setLoading] = useState(true)
    const { transferencia, revert, isLoading } = useTransfer()

    const [formData, setFormData] = useState({
        recipientAccount: { value: "", isValid: false, showError: false },
        amount: { value: "", isValid: false, showError: false }
    })

    const [accountNumber, setAccountNumber] = useState('');
    const navigate = useNavigate(); // Hook de navegación

    const isSubmitButtonDisabled = !Object.values(formData).every(field => field.isValid);

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
        let isValid = false;
        let validationMessage = '';

        switch (field) {
            case "recipientAccount":
                isValid = validateAccountNumber(value)
                validationMessage = accountNumberValidationMessage
                break
            case "amount":
                isValid = validateAmount(value)
                validationMessage = amountValidationMessage
                break
            default:
                isValid = true
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

    const resetForm = () => {
        setFormData({
            recipientAccount: {
                value: "",
                isValid: false,
                showError: false
            },
            amount: {
                value: "",
                isValid: false,
                showError: false
            }
        })
    }


    const handleTranfer = async (e) => {
        e.preventDefault()
        try {
            const idTransfer = await transferencia(
                formData.recipientAccount.value,
                formData.amount.value
            )
            if (idTransfer.data.newTransfer.recipientAccount === idTransfer.data.newTransfer.rootAccount) {
                Swal.fire({
                    title: 'Error',
                    text: 'The origin and recipient accounts cannot be the same.',
                    icon: 'error',
                })
                return
            }
            console.log(idTransfer.data.newTransfer.rootAccount)
            console.log(idTransfer.data.newTransfer._id)
            resetForm()
            Swal.fire({
                title: 'Transfer Completed',
                text: 'You have one minute to revert the transfer.',
                icon: 'success',
                timer: 60000, // 60 segs
                showCancelButton: true,
                confirmButtonText: 'Revert Transfer',
                cancelButtonText: 'Cancel',
                willClose: () => {
                    clearTimeout(timer)
                }
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        await revert(idTransfer.data.newTransfer._id)
                    } catch (error) {
                        console.error('Error Revert Transfer:', error)
                    }
                }
            })
            const timer = setTimeout(() => {
                Swal.close()
            }, 60000)
        } catch (error) {
            console.error('Error Transfer:', error)
        }
    }

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const account = queryParams.get('account');
        if (account) {
            setAccountNumber(account);
            setFormData(prevData => ({
                ...prevData,
                recipientAccount: {
                    ...prevData.recipientAccount,
                    value: account,
                    isValid: true
                }
            }));
        }
        const timer = setTimeout(() => {
            setLoading(false)
        }, 600)
        return () => clearTimeout(timer)
    }, [location])

    const handleGoBack = () => {
        navigate('/Home');
    };

    return (
        <div>
            {loading ? (
                <Spinner />
            ) : (
                <div>
                    <NavBar />
                    <br />
                    <center>
                        <div className="modal">
                        <button className="return-button" onClick={handleGoBack}>
                                    <svg height="16" width="16" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024"><path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"></path></svg>
                                    <span>Back</span>
                                </button>
                            <form className="form" onSubmit={handleTranfer}>
                                <div class="separator">
                                    <hr className="line" />
                                    <h1>Transferencia</h1>
                                    <hr className="line" />
                                </div>
                                <div className="credit-card-info--form">
                                    <div className="input_container">
                                        <label className="input_label">Cuenta receptora</label>
                                        <Input
                                            field="recipientAccount"
                                            name="RecipientAccount"
                                            className="input_field"
                                            type="number"
                                            value={formData.recipientAccount.value}
                                            onChangeHandler={(value) => handleValueChange(value, "recipientAccount")}
                                            onBlurHandler={(value) => handleValidationOnBlur(value, "recipientAccount")}
                                            showErrorMessage={formData.recipientAccount.showError}
                                            validationMessage={formData.recipientAccount.validationMessage}
                                            placeholder="0000 0000 0000 0000"
                                        />
                                    </div>
                                    <div className="input_container">
                                        <label className="input_label">Monto</label>
                                        <Input
                                            field="amount"
                                            name="Amount"
                                            className="input_field"
                                            type="number"
                                            value={formData.amount.value}
                                            onChangeHandler={(value) => handleValueChange(value, "amount")}
                                            onBlurHandler={(value) => handleValidationOnBlur(value, "amount")}
                                            showErrorMessage={formData.amount.showError}
                                            validationMessage={amountValidationMessage}
                                            placeholder="Q 00.00"
                                        />
                                    </div>
                                </div>
                                <button className="Btn"
                                    disabled={isSubmitButtonDisabled || isLoading}>
                                    Transferir
                                    <svg className="svgIcon" viewBox="0 0 576 512"><path d="M512 80c8.8 0 16 7.2 16 16v32H48V96c0-8.8 7.2-16 16-16H512zm16 144V416c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V224H528zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm56 304c-13.3 0-24 10.7-24 24s10.7 24 24 24h48c13.3 0 24-10.7 24-24s-10.7-24-24-24H120zm128 0c-13.3 0-24 10.7-24 24s10.7 24 24 24H360c13.3 0 24-10.7 24-24s-10.7-24-24-24H248z"></path></svg>
                                </button>
                            </form>
                        </div>
                    </center>
                    <Footer />
                </div>
            )}
        </div>
    )
}
