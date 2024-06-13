import { NavBar } from "../Navbar/Navbar"
import { Footer } from "../Footer/Footer"
import { Spinner } from "../../assets/spinner/Spinner"
import { useState, useEffect } from "react"
import './History.css'

export const History = () => {
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
        <div >
          <NavBar />
          <div >
          <div class="cardHistory">
            <div class="card-img"></div>
            <div class="card-info">
              <p class="text-title">Product title </p>
              <p class="text-body">Product description and details</p>
            </div>
            <div class="card-footer">
              <span class="text-title">$499.49</span>
              <div class="card-button">

              </div>
            </div></div>
            </div>
          <Footer />
        </div>
      )}
    </div>
  )
}

