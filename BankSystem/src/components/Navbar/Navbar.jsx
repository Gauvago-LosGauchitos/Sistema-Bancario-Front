import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css'
import imgPerfil from '../../assets/img/servicio-al-cliente.png';
import logo from '../../assets/img/logo.png'
import { useUser } from '../../shared/hooks/useUser.jsx';


export const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [dropdownActive, setDropdownActive] = useState(false);
  const [dropdownActiveService, setDropdownActiveService] = useState(false);
  const navigate = useNavigate();
  const { user, loading } = useUser()



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

  const handleHistory = ()=>{
    navigate('/History')
  }

  const handleLogout = () => {
    // Eliminar el token de localStorage
    localStorage.removeItem('authToken');
    // Redirigir al usuario a la página de inicio de sesión
    navigate('/login');
  };


  const toggleDropdown = () => {
    setDropdownActive(!dropdownActive);
  };

  const toggleDropdownService = () => {
    setDropdownActiveService(!dropdownActiveService);
  };

  const handleAdminPanel = () =>{
    navigate('/AdminPanel')
  }


  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className='body-navbar'>
      <header id="header" className={scrolled ? 'scrolled' : ''}>
        <div className="btn-navbar-logo" ><button><img className='img-logito' src={logo} /></button></div>
        <nav className='container-nav'>
          <ul className="nav-links">
            <div className="btn-navbar" >

              <button onClick={handleHome}><li>Home</li></button>
            </div>
            <div className="btn-navbar" >

              <button onClick={handleAbout} ><li>About</li></button>
            </div>
            <div className="btn-navbar" onClick={toggleDropdownService}>

              <button ><li>Service</li></button>
              <div className={`dropdown ${dropdownActiveService ? 'active' : ''}`}>
                <ul className=".dropdown-content">
                  <li><span onClick={handleTransfer} className='btn-perfil'>Transacción</span></li>
                  <li><span onClick={handleDeposit} className='btn-perfil'>Déposito</span></li>
                  <li><span onClick={handleBuyed} className='btn-perfil'>Compra </span></li>
                </ul>
              </div>
            </div>
          </ul>
        </nav>
        <div>
          <div className="btn-navbar" onClick={toggleDropdown}>
            <div>

              <div className="btn-navbar" onClick={toggleDropdown}>

                {!loading && user && user.userLogged && (
                  <div>
                    <button><img className='imgButton' src={user.userLogged.imgProfile || imgPerfil} alt="Profile" /></button>
                    <div className={`dropdown ${dropdownActive ? 'active' : ''}`}>
                      <ul className="dropdown-content">
                        <li><span className='btn-perfil'>Profile</span></li>
                        <li><span onClick={handleHistory} className='btn-perfil'>History</span></li>
                        <li><span className='btn-perfil' onClick={handleLogout}>LogOut</span></li>
                        {user.userLogged.role === 'ADMIN' && (
                          <li><span className='btn-perfil' onClick={handleAdminPanel}>Admin Panel</span></li>
                        )}
                      </ul>
                    </div>
                  </div>

                )}

              </div>
            </div>
            
          </div>
        </div>

      </header>
    </div>
  );
};