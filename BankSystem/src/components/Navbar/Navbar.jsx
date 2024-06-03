import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css'
import imgPerfil from '../../assets/img/servicio-al-cliente.png';
import logo from '../../assets/img/logo.png'
import { useUser } from '../../shared/hooks/useUser.jsx';


export const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [dropdownActive, setDropdownActive] = useState(false);
  const navigate = useNavigate();
  const { user, loading } = useUser()

  console.log(user)



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
            <li><a onClick={handleHome}>Home</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">About</a></li>
          </ul>
        </nav>
        <div>
          <div className="btn-navbar" onClick={toggleDropdown}>

            {!loading && user && user.userLogged && (
              <div>
                <button><img className='imgButton' src={user.userLogged.imgProfile || imgPerfil} alt="Profile" /></button>
                <div className={`dropdown ${dropdownActive ? 'active' : ''}`}>
                  <ul className="dropdown-content">
                    <li><span className='btn-perfil'>Profile</span></li>
                    <li><span className='btn-perfil'>Settings</span></li>
                    <li><span className='btn-perfil' onClick={handleLogout}>LogOut</span></li>
                    {user.userLogged.role === 'ADMIN' && (
                      <li><span className='btn-perfil'>Admin Panel</span></li>
                    )}
                  </ul>
                </div>
              </div>

            )}

          </div>
        </div>

      </header>
    </div>
  );
};