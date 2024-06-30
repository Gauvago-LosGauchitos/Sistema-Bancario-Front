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

export const Transfer = () => {
    const [loading, setLoading] = useState(true)
    const { transferencia, revert, isLoading } = useTransfer()

    const [formData, setFormData] = useState({
        recipientAccount: { value: "", isValid: false, showError: false },
        amount: { value: "", isValid: false, showError: false }
    })

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
                        await revert(idTransfer)
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
        const timer = setTimeout(() => {
            setLoading(false)
        }, 600)
        return () => clearTimeout(timer)
    }, [])
    return (
        <div>
            {loading ? (
                <Spinner />
            ) : (
                <div>
                    <NavBar />

                    <br />
                    <center><div className="modal">
                        <form className="form" onSubmit={handleTranfer}>
                            <div class="separator">
                                <hr className="line" />
                                <h1>Transacción</h1>
                                <hr className="line" />
                            </div>
                            <div className="credit-card-info--form">
                                <div className="input_container">
                                    <label className="input_label">Receiving account</label>
                                    <Input
                                        field="recipientAccount"
                                        name="RecipientAccount"
                                        className="input_field"
                                        type="number"
                                        value={formData.recipientAccount.value}
                                        onChangeHandler={handleValueChange}
                                        onBlurHandler={handleValidationOnBlur}
                                        showErrorMessage={formData.recipientAccount.showError}
                                        validationMessage={accountNumberValidationMessage}
                                        placeholder="0000 0000 0000 0000"
                                    />
                                </div>
                                <div className="input_container">
                                    <label className="input_label">Amount</label>
                                    <Input
                                        field="amount"
                                        name="Amount"
                                        className="input_field"
                                        type="number"
                                        value={formData.amount.value}
                                        onChangeHandler={handleValueChange}
                                        onBlurHandler={handleValidationOnBlur}
                                        showErrorMessage={formData.amount.showError}
                                        validationMessage={amountValidationMessage}
                                        placeholder="Q 00.00"
                                    />
                                </div>
                            </div>
                            <button className="purchase--btn"
                                disabled={isSubmitButtonDisabled || isLoading}>
                                Checkout
                            </button>
                        </form>
                    </div></center>
                    <Footer />
                </div>
            )}
        </div>
    )
}

