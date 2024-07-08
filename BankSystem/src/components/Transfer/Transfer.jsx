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
            if (idTransfer.data.newTransfer.rootAccount === idTransfer.data.newTransfer.recipientAccount) {
                Swal.fire({
                    title: 'Error',
                    text: 'The origin and recipient accounts cannot be the same.',
                    icon: 'error',
                });
                return;
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
                                <h1>Tranferencia</h1>
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
                            <button className="Btn"
                                disabled={isSubmitButtonDisabled || isLoading}>
                                    Transfer
                                <svg className="svgIcon" viewBox="0 0 576 512"><path d="M512 80c8.8 0 16 7.2 16 16v32H48V96c0-8.8 7.2-16 16-16H512zm16 144V416c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V224H528zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm56 304c-13.3 0-24 10.7-24 24s10.7 24 24 24h48c13.3 0 24-10.7 24-24s-10.7-24-24-24H120zm128 0c-13.3 0-24 10.7-24 24s10.7 24 24 24H360c13.3 0 24-10.7 24-24s-10.7-24-24-24H248z"></path></svg>
                            </button>
                            
                        </form>
                    </div></center>
                    <Footer />
                </div>
            )}
        </div>
    )
}

