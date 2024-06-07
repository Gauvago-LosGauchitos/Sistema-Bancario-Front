import React, { useState, useEffect } from 'react';
import { Spinner } from '../../assets/spinner/Spinner.jsx';
import { NavBar } from '../Navbar/Navbar.jsx';
import '../About/About.css';
import imgAbout from '../../assets/img/img-about.jpg';
import bgImage from '../../assets/img/bg-image.jpg'; // Asegúrate de tener una imagen de fondo en esta ruta
import { Footer } from '../Footer/Footer.jsx';

export const About = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula la carga con un timeout de 0.600 segundos
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bauchito-about-body">
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <NavBar />

          <div className="bauchito-container-about">
            <div className="bauchito-text-container">
              <div className="bauchito-titulo-container">
                <h1>BAUCHITO: SU ALIADO FINANCIERO MODERNO</h1>
              </div>
              <div>
                <p className="bauchito-parrafo-container">
                  Bauchito es un sistema bancario innovador, diseñado para ofrecer soluciones financieras accesibles y eficientes. Desde su creación, Bauchito se ha dedicado a proporcionar una amplia gama de servicios bancarios, incluyendo cuentas de ahorro, préstamos, y asesoramiento financiero personalizado.
                </p>
              </div>
              
              <div className="bauchito-section">
                <h2>Misión</h2>
                <p className="bauchito-parrafo-container">
                  Nuestra misión es empoderar a nuestros clientes con las herramientas y conocimientos necesarios para gestionar su bienestar financiero. En Bauchito, creemos en la importancia de la educación financiera y trabajamos continuamente para mejorar la vida de nuestros usuarios a través de productos y servicios de calidad.
                </p>
              </div>
              
              <div className="bauchito-section">
                <h2>Visión</h2>
                <p className="bauchito-parrafo-container">
                  Ser la institución financiera líder en innovación y accesibilidad, reconocida por nuestra dedicación a la satisfacción del cliente y nuestra capacidad para adaptarnos a las cambiantes necesidades del mercado.
                </p>
              </div>
              
              <div className="bauchito-section">
                <h2>Valores</h2>
                <ul className="bauchito-parrafo-container">
                  <li>Integridad: Actuamos con honestidad y transparencia en todas nuestras operaciones.</li>
                  <li>Compromiso: Estamos dedicados al éxito financiero de nuestros clientes.</li>
                  <li>Innovación: Buscamos constantemente nuevas formas de mejorar nuestros servicios.</li>
                  <li>Calidad: Nos esforzamos por ofrecer productos y servicios de la más alta calidad.</li>
                  <li>Responsabilidad: Somos responsables con nuestros clientes, la comunidad y el medio ambiente.</li>
                </ul>
              </div>
            </div>
            <div className="bauchito-img-container">
              <img className="bauchito-img-about-container" src={imgAbout} alt="About Bauchito" />
            </div>
          </div>
          <Footer />
        </div>
      )}
    </div>
  );
};
