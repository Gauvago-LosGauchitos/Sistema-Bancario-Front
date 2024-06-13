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
        <div>
          <NavBar />
          <br />
          <div class="notification">
            <div class="notiglow"></div>
            <div class="notiborderglow"></div>
            <div class="notititle">Welcome To Uiverse</div>
            <div class="notibody">Contribute to Open Source UI Elements</div>
          </div>
          <Footer />
        </div>
      )}
    </div>
  )
}

