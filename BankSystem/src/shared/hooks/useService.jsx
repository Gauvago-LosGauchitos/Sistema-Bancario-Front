import { useState, useEffect } from 'react';
import { listarService } from '../../services/api.js';

export const useService = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [service, setService] = useState([]);
    const [error, setError] = useState(null);

    const listarS = async () => {
        try {
            const response = await listarService();
            if (response.error) {
                console.error('Error al obtener los servicios:', response.error);
                setError(response.error);
                return;
            }
            setService(response.data);
        } catch (err) {
            console.error("Error al obtener las servicios:", err);
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
        listarS
    };
};
