import { NavBar } from "../Navbar/Navbar"
import { Footer } from "../Footer/Footer"
import { Spinner } from "../../assets/spinner/Spinner"
import { useDeposit } from "../../shared/hooks/useDeposit"
import { useState, useEffect } from "react"
import "./Deposit.css"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
export const Deposit = () => {
    const [loading, setLoading] = useState(true)
    const [recipientAccount, setRecipientAccount] = useState("")
    const [amount, setAmount] = useState("")
    const { deposito, revert, isLoading } = useDeposit()
    const navigate = useNavigate()

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false)
        }, 600)
        return () => clearTimeout(timer)
    }, [])

    const handleDeposit = async () => {
        if (!recipientAccount || !amount) {
            toast.error("Please fill in all fields")
            return
        }
        try {
            const idDeposit = await deposito(recipientAccount, amount)
            console.log(idDeposit) 
            Swal.fire({
                title: 'Deposit Completed',
                text: 'You have one minute to revert the deposit.',
                icon: 'success',
                timer: 60000,
                showCancelButton: true,
                confirmButtonText: 'Revert Deposit',
                cancelButtonText: 'Cancel',
                willClose: () => {
                    clearTimeout(timer)
                }
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        await revert(idDeposit)
                    } catch (error) {
                        console.error('Error Revert Deposit:', error)
                    }
                }
            })
            const timer = setTimeout(() => {
                Swal.close()
            },60000)
            setRecipientAccount("")
            setAmount("")
        } catch (error) {
            console.error("Error making deposit:", error)
            toast.error("An error occurred during the deposit")
        }
    }

    const handleGoBack = () => {
        navigate('/Home')
    }

    return (
        <div>
            {loading ? (
                <div className="full-screen-spinner">
                    <Spinner />
                </div>
            ) : (
                <div>
                    <NavBar />
                    <div>
                        <center>
                            <div className="pack-container">
                                <button className="return-button" onClick={handleGoBack}>
                                    <svg height="16" width="16" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024"><path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"></path></svg>
                                    <span>Back</span>
                                </button>
                                <div className="header-deposit">
                                    <div className="price-container">
                                        <span>Déposito</span>
                                    </div>
                                </div>
                                <div>
                                    <ul className="lists">
                                        <label className="input_label">Receiving account</label>
                                        <li className="list">
                                            <input
                                                className="input_field_deposit"
                                                type="number"
                                                name="recipientAccount"
                                                title="Input title"
                                                placeholder="0000 0000 0000 0000"
                                                value={recipientAccount}
                                                onChange={(e) => setRecipientAccount(e.target.value)}
                                            />
                                        </li>
                                    </ul>
                                    <br />
                                    <ul className="lists">
                                        <label className="input_label">Amount</label>
                                        <li className="list">
                                            <input
                                                className="input_field_deposit"
                                                type="number"
                                                name="amount"
                                                title="Input title"
                                                placeholder="Q 00.00"
                                                value={amount}
                                                onChange={(e) => setAmount(e.target.value)}
                                            />
                                        </li>
                                    </ul>
                                </div>
                                <div className="button-container">
                                    <button className="Btn" onClick={handleDeposit} disabled={isLoading}>
                                        <>
                                            Deposit
                                            <svg className="svgIcon" viewBox="0 0 576 512"><path d="M512 80c8.8 0 16 7.2 16 16v32H48V96c0-8.8 7.2-16 16-16H512zm16 144V416c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V224H528zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm56 304c-13.3 0-24 10.7-24 24s10.7 24 24 24h48c13.3 0 24-10.7 24-24s-10.7-24-24-24H120zm128 0c-13.3 0-24 10.7-24 24s10.7 24 24 24H360c13.3 0 24-10.7 24-24s-10.7-24-24-24H248z"></path></svg>
                                        </>
                                    </button>
                                </div>
                            </div>
                        </center>
                    </div>
                    <Footer />
                </div>
            )}
        </div>
    )
}
