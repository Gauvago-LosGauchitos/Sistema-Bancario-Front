import React, { useState, useEffect } from 'react';
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

export const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const { exchangeRateEUR, exchangeRate } = useUser();
  const navigate = useNavigate();

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

          </div>

          <Footer />
        </div>
      )}
    </div>
  );
};
