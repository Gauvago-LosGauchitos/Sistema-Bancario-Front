import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css'
import imgPerfil from '../../assets/img/servicio-al-cliente.png';
import logo from '../../assets/img/logo.png'
import { useUser } from '../../shared/hooks/useUser.jsx';
import { useUserDetails } from '../../shared/hooks/useUserDetails.jsx';
import { Auth } from '../Auth';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import dolar from '../../assets/img/dolar.png';
import euro from '../../assets/img/euro.png';


export const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [dropdownActive, setDropdownActive] = useState(false);
  const [dropdownActiveService, setDropdownActiveService] = useState(false);
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const { isLogged, logoutSys } = useUserDetails()
  const navigate = useNavigate();
  const { exchangeRateEUR, exchangeRate, searchUser, userResult, params, handleSearchByUsername, searchUserByUsername, setParams, isUserLoaded } = useUser();
  const { user, loading } = useUser()
  const { history } = useUser();

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  const handleHome = () => {
    navigate('/Home')
  };

  const handleTransfer = () => {
    navigate('/Transfer')
  };

  const handleDeposit = () => {
    navigate('/Deposit')
  };

  const handleBuyed = () => {
    navigate('/Buyed')
  };

  const handleAbout = () => {
    navigate('/About')
  };

  const handleHistory = () => {
    navigate('/History')
  }

  const handlePerfil = () => {
    navigate('/Perfil')
  }

  const handleServices = () => {
    navigate('/Services')
  }

  const handleLogout = () => {
    console.log('Estoy cerrando la sesión');
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
    navigate('/home')
    window.location.reload();
  };

  const toggleDropdown = () => {
    setDropdownActive(!dropdownActive);
  };

  const toggleDropdownService = () => {
    setDropdownActiveService(!dropdownActiveService);
  };

  const handleAdminPanel = () => {
    navigate('/AdminPanel')
  }

  const openLoginPopup = () => {
    setIsLoginVisible(true);
    document.body.style.overflow = 'hidden';
  }

  const closeLoginPopup = () => {
    setIsLoginVisible(false);
    document.body.style.overflow = '';
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className='body-navbar'>
      <header id="header" className={scrolled ? 'scrolled' : ''}>
        <div className="btn-navbar-logo" ><button onClick={handleHome}><img className='img-logito' src={logo} /></button></div>
        <nav className='container-nav'>
          <ul className="nav-links">
            <div className="btn-navbar" >
              <button onClick={handleHome}><li>Home</li></button>
            </div>
            <div className="btn-navbar" >
              <button onClick={handleAbout} ><li>About</li></button>
            </div>
            <div className="btn-navbar" >
              <button onClick={handleServices} ><li>Services</li></button>
            </div>
            <div className="btn-navbar" onClick={toggleDropdownService}>
              <button ><li>Motion</li></button>
              <div className={`dropdown ${dropdownActiveService ? 'active' : ''}`}>
                <ul className=".dropdown-content">
                  <li><span onClick={handleTransfer} className='btn-perfil'>Transacción</span></li>
                  {!loading && user && user.userLogged && (
                    <div>
                      {user.userLogged.role === 'ADMIN' && (
                        <li><span onClick={handleDeposit} className='btn-perfil'>Déposito</span></li>
                      )}
                    </div>
                  )}


                </ul>
              </div>
            </div>
          </ul>
        </nav>
        <div>
          <div className="btn-navbar2" onClick={toggleDropdown}>
            <div>
              <div className="btn-navbar2" onClick={toggleDropdown}>
                {isLogged === false ? (
                  <button onClick={openLoginPopup} class="buttonLog">
                    <span class="button_lg">
                      <span class="button_sl"></span>
                      <span class="button_text">Logueate!</span>
                    </span>
                  </button>
                ) : (
                  <div>
                    {!loading && user && user.userLogged && (
                      <div>
                        <button><img className='imgButton' src={user.userLogged.imgProfile || imgPerfil} alt="Profile" /></button>
                        <div className={`dropdown ${dropdownActive ? 'active' : ''}`}>
                          <ul className="dropdown-content">
                            <li><span onClick={handlePerfil} className='btn-perfil'>Profile</span></li>
                            <li><span onClick={handleHistory} className='btn-perfil'>History</span></li>
                            {user.userLogged.role === 'ADMIN' && (
                              <li><span className='btn-perfil' onClick={handleAdminPanel}>Admin Panel</span></li>
                            )}
                            <li><span className='btn-perfil' onClick={handleLogout}>LogOut</span></li>

                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {(
        <div className="balance-section">
        <Paper elevation={3} className="exchange-rate-container" sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', borderRadius: '8px', backgroundColor: '#101313', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>

          <Typography variant="h6" className="exchange-rate-title" sx={{ color: 'white' }}>1 USD =</Typography>
          <Typography variant="h6" className="exchange-rate">{exchangeRate}</Typography>
          <Typography variant="h6" className="exchange-rate-symbol" sx={{ color: 'white' }}>GTQ </Typography>
          <div className='divisaDiv'>
            hola
          </div>
          <Typography variant="h6" className="exchange-rate-title" sx={{ color: 'white' }}>1 EUR =</Typography>
          <Typography variant="h6" className="exchange-rate">{exchangeRateEUR}</Typography>
          <Typography variant="h6" className="exchange-rate-symbol" sx={{ color: 'white' }}>GTQ</Typography>
        </Paper>
        </div>


      )}
      {isLogged === true ? (
        <div className="balance-section">
          <h2>Tú Balance</h2>

          <p className="total-balance">Q {history?.transfers[0]?.rootAccount?.availableBalance}</p>
        </div>

      ) : (
        <div></div>
      )}


      <Auth isVisible={isLoginVisible} onClose={closeLoginPopup} />
    </div>
  );
};
