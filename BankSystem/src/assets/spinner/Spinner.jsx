import React from 'react';
import './Spinner.css'; // Importa los estilos para el spinner

export const Spinner = () => {
  return (
    <div className="spinner-container">
      <div className="loader"></div>
      <p>Cargando...</p>
    </div>
  );
};

