import React, { useState, useEffect, useCallback } from 'react';
import { Spinner } from '../../assets/spinner/Spinner.jsx';
import { NavBar } from '../Navbar/Navbar.jsx'
import '../HomePage/HomePage.css';
import imgHome from '../../assets/img/img-home.png';
import imgTransaccion from '../../assets/img/img-transaccion.png';
import imgDeposito from '../../assets/img/img-depositar.png';
import imgCompra from '../../assets/img/img-compra.png';
import { Footer } from '../Footer/Footer.jsx';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import '../adminPanel/AdminPanel.css';
import dolar from '../../assets/img/dolar.png';
import euro from '../../assets/img/euro.png';
import { useUser } from '../../shared/hooks/useUser.jsx';
import { useFavorite } from '../../shared/hooks/useFavorite.jsx';
import toast from "react-hot-toast";
import { useUserDetails } from '../../shared/hooks/useUserDetails.jsx';
import profileDefault from '../../assets/img/defaultUser.png';
import Swal from 'sweetalert2';
import cajaFuerte from '../../assets/img/cajaFuerte.png';
import { Auth } from '../Auth';



export const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const { exchangeRateEUR, exchangeRate, searchUser, userResult, params, handleSearchByUsername, searchUserByUsername, setParams, isUserLoaded } = useUser();
  const { favorites, isLoading, addFavorite, deleteFavorites } = useFavorite()
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { isLogged, logoutSys } = useUserDetails()
  const [isLoginVisible, setIsLoginVisible] = useState(false);


  const openLoginPopup = () => {
    setIsLoginVisible(true);
    document.body.style.overflow = 'hidden';
  }

  const closeLoginPopup = () => {
    setIsLoginVisible(false);
    document.body.style.overflow = ''; 
  }


  const handleAbout = () => {
    navigate('/About')
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


  useEffect(() => {
    // Simula la carga con un timeout de 0.600 segundos
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  const navigateTo = (path) => {
    window.location.href = path;
  };

  const addToFavorites = async (user) => {
    let username = user.username;
    await searchUserByUsername(username);
  };

  useEffect(() => {
    if (isUserLoaded) {
      console.log('Usuario encontrado:', userResult);
      let data = {
        alias: userResult.user.username,
        accountFavorite: userResult.account._id
      };
      addFavorite(data);
      toast.success('Usuario agregado a favoritos!')

    }
  }, [isUserLoaded, userResult]);

  const handleDeleteFavorite = async (id) => {
    const { value: confirmUpload } = await Swal.fire({
      title: 'Confirm Delete',
      text: 'Estas seguro que deseas eliminar este favorito?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    });

    if (confirmUpload) {
      try {
        await deleteFavorites(id);
      } catch (error) {
        console.error('Error deleting favorite:', error);
      }
    }

  }


  const favoriteAccounts = favorites

  const itemsPerPage = 3;
  const totalSlides = Math.ceil(favoriteAccounts?.length / 3);

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? totalSlides - 1 : currentSlide - 1);
  };

  const nextSlide = () => {
    setCurrentSlide(currentSlide === totalSlides - 1 ? 0 : currentSlide + 1);
  };

  const handleSearch = async (query) => {
    setParams(null)
    setSearchQuery(query);

    if (query.trim() !== '') {
      try {
        await handleSearchByUsername(query);
      } catch (error) {
        console.error('Error al buscar usuario:', error);
      } finally {
        setLoading(false);
      }
    } else {
      setSearchResults([]);
    }
  };

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <NavBar />

          <div className="container-home">
            <div className="container-text">
              <div className="text-container">
                <div className="titulo-container">
                  <h1>SU ALIADO FINANCIERO DE CONFIANZA</h1>
                </div>
                <div>
                  <p className="parrafo-container">
                    Los ministros de Trabajo de Latinoamérica se reunieron en 1963 para discutir cómo harían propia la Alianza para el Progreso. Emitieron la Declaración de Cundinamarca que recomendaba la creación de bancos que fomentaran el ahorro en los trabajadores y atendieran sus necesidades crediticias. Por ello, el Gobierno de Guatemala emitió el decreto que dio vida al Banco de los Trabajadores.
                  </p>
                </div>
                <center><button onClick={handleAbout} className="button-home">Leer más</button></center>
              </div>
              <div className="img-container">
                <img className="img-home-container" src={imgHome} alt="Home" />
              </div>
            </div>

            <div className="services-container">
              <div className="service-card" onClick={handleTransfer}>
                <img src={imgTransaccion} alt="Transacción" className="service-img" />
                <h3>Transacciones</h3>
                <p>Realice sus transacciones de manera rápida y segura.</p>
              </div>
              <div className="service-card" onClick={handleDeposit}>
                <img src={imgDeposito} alt="Servicio" className="service-img" />
                <h3>Deposito</h3>
                <p>Realice depositos a cualquier persona u organizacion.</p>
              </div>
              <div className="service-card" onClick={handleBuyed}>
                <img src={imgCompra} alt="Compra" className="service-img" />
                <h3>Compras</h3>
                <p>Disfrute de nuestras ofertas y servicios de compra en línea.</p>
              </div>
            </div>
            <Box className="chart-container" sx={{ mb: 3 }}>
              <Typography variant="h5" className="section-title">Tipo de Cambio (USD/GTQ/EUR)</Typography>
              <Divider sx={{ mb: 2 }} />
              {(
                <Paper elevation={3} className="exchange-rate-container" sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f5f5f5', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                  <img src={dolar} alt="exchange icon" className="exchange-rate-icon" />
                  <Typography variant="h6" className="exchange-rate-title">1 USD =</Typography>
                  <Typography variant="h6" className="exchange-rate">{exchangeRate}</Typography>
                  <Typography variant="h6" className="exchange-rate-symbol">GTQ</Typography>
                </Paper>
              )}
              {(
                <Paper elevation={3} className="exchange-rate-container" sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f5f5f5', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                  <img src={euro} alt="exchange icon" className="exchange-rate-icon" />
                  <Typography variant="h6" className="exchange-rate-title">1 EUR =</Typography>
                  <Typography variant="h6" className="exchange-rate">{exchangeRateEUR}</Typography>
                  <Typography variant="h6" className="exchange-rate-symbol">GTQ</Typography>
                </Paper>
              )}
            </Box>
            <div>
              {!isLogged ? (
                <div class="containerLog">
                  <div class="image-section">
                    <img src={cajaFuerte} alt="Illustration of various data points and charts in a futuristic setting displayed on a tablet" />
                  </div>
                  <div class="content-section">
                    <button onClick={openLoginPopup} class="buttonLog">
                      <span class="button_lg">
                        <span class="button_sl"></span>
                        <span class="button_text">Logueate!</span>
                      </span>
                    </button>
                    <div class="cardLog">
                      <i class="fas fa-phone-volume"></i>
                      <h3>Inicia sesion</h3>
                      <p>para continuar manejando tu cuenta!</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="favorites-container">
                  <h5 className="section-title">Agregar a Favoritos</h5>
                  <div className="divider"></div>
                  <div className="search-container">
                    <input
                      type="text"
                      placeholder="Buscar usuario"
                      className="search-bar"
                      value={searchQuery}
                      onChange={(e) => handleSearch(e.target.value)}
                    />
                    {searchQuery.trim() !== '' && (
                      <div className="search-results">
                        {params && params.length > 0 ? (
                          params.map((user) => (
                            <div key={user.id} className="search-result" onClick={() => addToFavorites(user)}>
                              <ul>
                                <li>
                                  <a>{user.username || 'No se encontraron usuarios'}</a>

                                </li>
                              </ul>

                            </div>
                          ))
                        ) : (
                          <div className="no-results">No se encontraron resultados</div>
                        )}
                      </div>
                    )}
                  </div>
                  <h5 className="section-title">Mis Favoritos</h5>
                  <div className="divider"></div>
                  <div className="slider">
                    <button className="slider-btn prev" onClick={prevSlide}>‹</button>
                    <div className="slider-viewport">
                      <div className="slider-content" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                        {favoriteAccounts?.map(account => (
                          <div key={account.id} >
                            <div >
                              <div class="cardFavorite">
                                <div class="image_container">
                                  <img src={account.accountFavorite.client.imgProfile || profileDefault} className='image' alt='fotoDeperfil' />
                                </div>

                                <div >
                                  <div class="titleCardFavorite" >
                                    <span>No. account: </span>
                                  </div>

                                </div>
                                <div class="titleCardFavorite">
                                  <span>{account?.accountFavorite?.accountNumber}</span>
                                </div>
                                <div class="action">
                                  <div class="priceCardFavorite">
                                    <span>{account.alias} </span>
                                  </div>
                                  <button class="animated-button">
                                    <span onClick={() => handleDeleteFavorite(account._id)}>Eliminar</span>
                                    <span></span>
                                  </button>
                                </div>
                              </div>

                            </div>


                          </div>
                        ))}
                      </div>
                    </div>
                    <button className="slider-btn next" onClick={nextSlide}>›</button>
                  </div>

                </div>
              )
              }
            </div>
          </div>
          <Footer />
        </div>
      )}
      <Auth isVisible={isLoginVisible} onClose={closeLoginPopup} />
    </div>
  );
};
