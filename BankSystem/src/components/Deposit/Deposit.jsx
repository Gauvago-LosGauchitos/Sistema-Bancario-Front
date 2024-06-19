import { NavBar } from "../Navbar/Navbar"
import { Footer } from "../Footer/Footer"
import { Spinner } from "../../assets/spinner/Spinner"
import { useDeposit } from "../../shared/hooks/useDeposit"
import { useState, useEffect } from "react"
import "./Deposit.css"
import toast from "react-hot-toast"

export const Deposit = () => {
    const [loading, setLoading] = useState(true)
    const [recipientAccount, setRecipientAccount] = useState("")
    const [amount, setAmount] = useState("")
    const { deposito, isLoading } = useDeposit()

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
        await deposito(recipientAccount, amount)
        setRecipientAccount("")
        setAmount("")
    }

    return (
        <div>
            {loading || isLoading ? (
                <div className="full-screen-spinner">
                    <Spinner />
                </div>
            ) : (
                <div>
                    <NavBar />
                    <div>
                        <center>
                            <div className="pack-container">
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
                                        {isLoading ? (
                                            <Spinner />
                                        ) : (
                                            <>
                                                Deposit
                                                <svg className="svgIcon" viewBox="0 0 576 512"><path d="M512 80c8.8 0 16 7.2 16 16v32H48V96c0-8.8 7.2-16 16-16H512zm16 144V416c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V224H528zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm56 304c-13.3 0-24 10.7-24 24s10.7 24 24 24h48c13.3 0 24-10.7 24-24s-10.7-24-24-24H120zm128 0c-13.3 0-24 10.7-24 24s10.7 24 24 24H360c13.3 0 24-10.7 24-24s-10.7-24-24-24H248z"></path></svg>
                                            </>
                                        )}
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
