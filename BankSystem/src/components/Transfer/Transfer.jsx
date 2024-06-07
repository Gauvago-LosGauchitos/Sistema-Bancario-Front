import { NavBar } from "../Navbar/Navbar"
import { Footer } from "../Footer/Footer"
import { Spinner } from "../../assets/spinner/Spinner"
import { useState, useEffect } from "react"
import "./Transfer.css"

export const Transfer = () => {
    const [loading, setLoading] = useState(true)
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
                    <center><div class="modal">
                        <form class="form">
                            <div class="separator">
                                <hr class="line" />
                                <h1>Transacción</h1>
                                <hr class="line" />
                            </div>
                            <div class="credit-card-info--form">
                                <div class="input_container">
                                    <label for="password_field" class="input_label">Card holder full name</label>
                                    <input id="password_field" class="input_field" type="text" name="input-name" title="Inpit title" placeholder="Enter your full name" />
                                </div>
                                <div class="input_container">
                                    <label for="password_field" class="input_label">Account Number</label>
                                    <input id="password_field" class="input_field" type="number" name="input-name" title="Inpit title" placeholder="0000 0000 0000 0000" />
                                </div>
                                <div class="input_container">
                                    <label for="password_field" class="input_label">Receiving account</label>
                                    <input id="password_field" class="input_field" type="number" name="input-name" title="Inpit title" placeholder="0000 0000 0000 0000" />
                                </div>
                                <div class="input_container">
                                    <label for="password_field" class="input_label">Amount</label>
                                    <input id="password_field" class="input_field" type="text" name="input-name" title="Expiry Date" placeholder="Q 00.00" />
                                </div>
                            </div>
                            <button class="purchase--btn">Checkout</button>
                        </form>
                    </div></center>
                    <Footer />
                </div>
            )}
        </div>
    )
}

