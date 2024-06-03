import React, { useState, useEffect } from 'react';
import { Spinner } from '../../assets/spinner/Spinner.jsx';
import { NavBar } from '../Navbar/Navbar.jsx';
import '../HomePage/HomePage.css';
import imgHome from '../../assets/img/img-home.png';
import { Footer } from '../Footer/Footer.jsx';

export const HomePage = () => {
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    // Simula la carga con un timeout de 0.300 segundos
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <NavBar />
          <br />
          <br />
          <br />
          <div className="container-home">
            <div className="text-container">
              <br />
              <br />
              <br />
              <br />
              <div className="titulo-container"><h1>SU ALIADO FINANCIERO DE CONFIANZA</h1></div>
              <div>
                <p className="parrafo-container">
                  Los ministros de Trabajo de Latinoamérica se reunieron en 1963 para discutir cómo harían propia la Alianza para el Progreso. Emitieron la Declaración de Cundinamarca que recomendaba la creación de bancos que fomentaran el ahorro en los trabajadores y atendieran sus necesidades crediticias. Por ello, el Gobierno de Guatemala emitió el decreto que dio vida al Banco de los Trabajadores.
                </p>
              </div>
              <br />
              <br />
              <center><button className="button-home">Leer más</button></center>
            </div>
            <div className="img-container"><img className="img-home-container" src={imgHome} alt="Home" /></div>
          </div>
          <Footer/>
        </div>
      )}
    </div>
  );
};
