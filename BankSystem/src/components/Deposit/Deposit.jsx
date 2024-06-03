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
                    
                    <Footer />
                </div>
            )}
        </div>
    )
}
