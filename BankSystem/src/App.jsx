import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../Routes.jsx';
import { Toaster, toast } from 'react-hot-toast';
import { isTokenExpired } from './utils/tokenUtils';

function App() {
  const navigate = useNavigate();

  

  useEffect(() => {
    // Verifica si el token ha vencido
    const token = localStorage.getItem('authToken');

    if (!token || isTokenExpired(token)) {
      localStorage.clear();
      toast.error('Tu sesión ha expirado. Por favor, vuelve a iniciar sesión.');
      navigate('/Home'); // Redirige a la página de inicio
    }
  }, [navigate]);

  return (
    <>
      <AppRoutes />
      <Toaster position='bottom-right' reverseOrder={false} />
    </>
  );
}

export default App;
