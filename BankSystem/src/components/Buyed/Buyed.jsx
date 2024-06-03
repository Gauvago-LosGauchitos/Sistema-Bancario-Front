import { NavBar } from "../Navbar/Navbar"
import { Footer } from "../Footer/Footer"
import { Spinner } from "../../assets/spinner/Spinner"
import { useState, useEffect } from "react"
import "./Buyed.css"

export const Buyed = () => {
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
                    <div class="container-deposit">
                        <center><div class="card cart">
                            <label class="title-deposit">Buys</label>
                            <div class="steps">
                                <div class="step">
                                    <div>
                                        <span>DATA CLIENT</span>
                                        <p>Name</p>
                                        <p>chitu</p>
                                    </div>
                                    <hr />
                                    <div class="promo">
                                        <span>ACCOUNT</span>
                                        <form class="form">
                                            <input type="number" placeholder="0000 0000 0000 0000" class="input_field" />
                                        </form>
                                    </div>
                                    <hr />
                                    <div class="payments">
                                        <span>PAYMENT</span>
                                        <div class="details">
                                            <span>Subtotal:</span>
                                            <span>$240.00</span>
                                            <span>Shipping:</span>
                                            <span>$10.00</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                            <div class="card checkout">
                                <div class="footer">
                                    <label class="price">$280.40</label>
                                    <div data-tooltip="Price:-$$" class="button">
                                        <div class="button-wrapper">
                                            <div class="text">Buy Now</div>
                                            <span class="icon">
                                                <svg viewBox="0 0 16 16" class="bi bi-cart2" fill="currentColor" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"></path>
                                                </svg>
                                            </span>
                                        </div>
                                    </div>


                                </div>
                            </div></center>
                    </div>
                    <Footer />
                </div>
            )}
        </div>
    )
}
