import React, { useState, useEffect } from 'react';
import './FloatingButton.css';
import Swal from 'sweetalert2';
import toast from "react-hot-toast";
import profileDefault from '../img/defaultUser.png';
import deleteFavorite from '../img/eliminarFavorito.png';
import { useUser } from '../../shared/hooks/useUser.jsx';
import { useFavorite } from '../../shared/hooks/useFavorite.jsx';
import { useUserDetails } from '../../shared/hooks/useUserDetails.jsx';

export const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { searchUserByUsername, userResult, params, setParams, isUserLoaded } = useUser();
  const { favorites, addFavorite, deleteFavorites } = useFavorite();
  const { isLogged } = useUserDetails();
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const togglePanel = () => {
    setIsOpen(!isOpen);
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
      toast.success('Usuario agregado a favoritos!');
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
  };

  const handleSearch = async (query) => {
    setParams(null);
    setSearchQuery(query);

    if (query.trim() !== '') {
      try {
        await searchUserByUsername(query);
      } catch (error) {
        console.error('Error al buscar usuario:', error);
      }
    }
  };

  const favoriteAccounts = favorites;
  const itemsPerPage = 3;
  const totalSlides = Math.ceil(favoriteAccounts?.length / itemsPerPage);

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? totalSlides - 1 : currentSlide - 1);
  };

  const nextSlide = () => {
    setCurrentSlide(currentSlide === totalSlides - 1 ? 0 : currentSlide + 1);
  };

  return (
    <>
      <button className="floating-button" onClick={togglePanel}>
        ★
      </button>
      <div className={panel ${isOpen ? 'open' : ''}}>
        <div className="panel-header">
          <h4>Favoritos</h4>
          <button onClick={togglePanel}>✖</button>
        </div>
        <div className="panel-body">
          {!isLogged ? (
            <div>
              <p>Inicia sesión para ver y gestionar tus favoritos.</p>
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
                  <div className="slider-content" style={{ transform: translateX(-${currentSlide * (100 / totalSlides)}%) }}>
                    {favoriteAccounts?.map((account) => (
                      <div key={account.id} className="slider-item">
                        <div className="cardFavorite">
                          <div className="image_container">
                            <img src={account.accountFavorite.client.imgProfile || profileDefault} className='image' alt='fotoDeperfil' />
                          </div>
                          <div className="titleCardFavorite">
                            <span>No. account: </span>
                          </div>
                          <div className="titleCardFavorite">
                            <span>{account?.accountFavorite?.accountNumber}</span>
                          </div>
                          <div className="action">
                            <div className="titleCardFavorite">
                              <span>{account.alias} </span>
                            </div>
                            <button className="animated-button" onClick={() => handleDeleteFavorite(account._id)}>
                              <img className='iconFav' src={deleteFavorite} alt="Eliminar" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <button className="slider-btn next" onClick={nextSlide}>›</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};