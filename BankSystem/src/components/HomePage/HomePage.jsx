import React, { useState, useEffect } from 'react';
import {Spinner} from '../../assets/spinner/Spinner.jsx'

export const HomePage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula la carga con un timeout de 2 segundos
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='container-homePage'>
      {loading ? (
        <Spinner />
      ) : (
        <div>Esto es el HomePage we</div>
      )}
    </div>  
  );
};

