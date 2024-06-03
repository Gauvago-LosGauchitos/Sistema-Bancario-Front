import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css'
import imgPerfil from '../../assets/img/servicio-al-cliente.png';
import logo from '../../assets/img/logo.png'

export const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [dropdownActive, setDropdownActive] = useState(false);
  const [dropdownActiveService, setDropdownActiveService] = useState(false);
  const navigate = useNavigate();



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

              <button ><li>About</li></button>
            </div>
            <div className="btn-navbar" onClick={toggleDropdownService}>

              <button ><li>Service</li></button>
              <div className={`dropdown ${dropdownActiveService ? 'active' : ''}`}>
                <ul className=".dropdown-content">
                  <li><span className='btn-perfil'>Transacción</span></li>
                  <li><span className='btn-perfil'>Déposito</span></li>
                  <li><span className='btn-perfil'>Compra </span></li>
                </ul>
              </div>
            </div>
          </ul>
        </nav>
        <div>

          <div className="btn-navbar" onClick={toggleDropdown}>

            <button><img className='imgButton' src={imgPerfil} alt="Profile" /></button>
            <div className={`dropdown ${dropdownActive ? 'active' : ''}`}>
              <ul className="dropdown-content">
                <li><span className='btn-perfil'>Profile</span></li>
                <li><span className='btn-perfil'>Settings</span></li>



                <li><span className='btn-perfil' onClick={handleLogout}>LogOut</span></li>
              </ul>
            </div>
          </div>
        </div>

      </header>
    </div>
  );
};