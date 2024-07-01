import { useState, useEffect } from 'react';
import { listarService, buyed, addService, deleteService, searchService, editService } from '../../services/api.js';
import toast from "react-hot-toast";

export const useService = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [service, setService] = useState([]);
    const [serviceFound, setServiceFound] = useState([]);
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
<<<<<<< HEAD
            console.error('Error al obtener las servicios:', err);
=======
            console.error("Error al obtener los servicios:", err);
>>>>>>> 0cbc6e09152484cbbef381293852733d6791efef
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const bougth = async (service) => {
<<<<<<< HEAD
        setIsLoading(true);
        try {
            const response = await buyed(service);
            console.log(response);
            setBalance(response.newBalance); // Actualizar el balance del usuario
=======
        setIsLoading(true)
        try {
            const response = await buyed(service)
            console.log(response)
>>>>>>> 0cbc6e09152484cbbef381293852733d6791efef
        } catch (err) {
            console.error('Error en realizar la compra:', err);
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    //Agregar un servicio
    const addNewService = async (service) => {
        setIsLoading(true);
        try {
            const response = await addService(service);
            console.log(response);
        } catch (err) {
            console.error("Error al agregar el servicio:", err);
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    //Eliminar un servicio
    const deleteAService = async (service) => {
        setIsLoading(true);
        try {
            const response = await deleteService(service)
            if (response.error) {
                console.error('Error al eliminar el servicio:', response.error);
                toast.error(error.response.data.message)
                setError(response.error);
                return;
            }
            console.log(response)
        } catch (err) {
            console.error("Error al eliminar el servicio:", err);
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }

    //Buscar servicio por nombre
    const searchServiceByName = async (name) => {
        setIsLoading(true)
        try {
            const response = await searchService(name)
            if (response.error) {
                console.error('Error al obtener el servicio:', response.error);
                toast.error(error.response.data.message)
                setError(response.error);
                return;
            }
            setServiceFound(response.data.service)
            
        } catch (error) {
            console.error("Error al buscar el servicio:", error);
            toast.error(error.response.data.message)
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    }

    //Editar un servicio
    const editAService = async (name, data) => {
        setIsLoading(true)
        try {
            const response = await editService(name, data)
            if (response.error) {
                console.error('Error al actualizar el usuario:', response.error);
                toast.error(error.response.data.message)
                setError('Error al actualizar el usuario');
            } 
        } catch (error) {
            console.error("Error al editar el servicio:", error);
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        listarS();
    }, []);

    return {
        service,
        error,
        isLoading,
        balance,  // Devuelve el balance en el hook
        listarS,
        bougth,
        addNewService,
        deleteAService,
        searchServiceByName,
        serviceFound,
        editAService
    };
};
