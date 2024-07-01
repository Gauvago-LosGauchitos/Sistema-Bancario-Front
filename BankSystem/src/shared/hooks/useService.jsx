import { useState, useEffect } from 'react';
import { listarService, buyed } from '../../services/api.js';

export const useService = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [service, setService] = useState([]);
    const [error, setError] = useState(null);
    const [balance, setBalance] = useState(null); // Nuevo estado para el balance del usuario

    const listarS = async () => {
        setIsLoading(true);
        try {
            const response = await listarService();
            if (response.error) {
                console.error('Error al obtener los servicios:', response.error);
                setError(response.error);
                return;
            }
            setService(response.data);
        } catch (err) {
            console.error('Error al obtener las servicios:', err);
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const bougth = async (service) => {
        setIsLoading(true);
        try {
            const response = await buyed(service);
            console.log(response);
            setBalance(response.newBalance); // Actualizar el balance del usuario
        } catch (err) {
            console.error('Error en realizar la compra:', err);
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        listarS();
    }, []);

    return {
        service,
        error,
        isLoading,
        balance,  // Devuelve el balance en el hook
        listarS,
        bougth
    };
};
