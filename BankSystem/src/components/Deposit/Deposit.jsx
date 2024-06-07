import { NavBar } from "../Navbar/Navbar"
import { Footer } from "../Footer/Footer"
import { Spinner } from "../../assets/spinner/Spinner"
import { useState, useEffect } from "react"
import "./Deposit.css"

export const Deposit = () => {
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
                    <div>
                        <center>
                            <div class="pack-container">
                                <div class="header-deposit">
                                    <div class="price-container">
                                        <span>Déposito</span>
                                    </div>
                                </div>
                                <div>
                                    <ul class="lists">
                                    <label  class="input_label">Receiving account</label>
                                        <li class="list">
                                        <input class="input_field" type="number" name="input-name" title="Inpit title" placeholder="0000 0000 0000 0000" />
                                        </li> 
                                    </ul>
                                    <br />
                                    <ul class="lists">
                                    <label  class="input_label">Amount</label>
                                        <li class="list">
                                        <input class="input_field" type="number" name="input-name" title="Inpit title" placeholder="Q 00.00" />
                                        </li>
                                       
                                    </ul>
                                </div>
                                <div class="button-container">
                                    <button class="Btn">
                                        Deposit
                                        <svg class="svgIcon" viewBox="0 0 576 512"><path d="M512 80c8.8 0 16 7.2 16 16v32H48V96c0-8.8 7.2-16 16-16H512zm16 144V416c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V224H528zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm56 304c-13.3 0-24 10.7-24 24s10.7 24 24 24h48c13.3 0 24-10.7 24-24s-10.7-24-24-24H120zm128 0c-13.3 0-24 10.7-24 24s10.7 24 24 24H360c13.3 0 24-10.7 24-24s-10.7-24-24-24H248z"></path></svg>
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
