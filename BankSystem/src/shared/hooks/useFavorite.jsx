import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import { addFavorite as addFavoriteService, listFavorites, deleteFavorite } from "../../services/api";

export const useFavorite = () => {
    const [favorites, setFavorites] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const addFavorite = async (data) => {
        setLoading(true);
        try {
            const response = await addFavoriteService(data);
            if (response?.error) {
                setFavorites(null);
                toast.error(response.errorObject.response.data.message);
                console.error('Error al agregar favorito:', response.errorObject.response.data);
                setError('Error al agregar favorito');
            } else {
                console.log('FavoriteResult:', response);
                listFavorite()
            }
        } catch (err) {
            setError("Error al agregar el favorito");
            console.error("Error al agregar el favorito:", err);
        } finally {
            setLoading(false);
        }
    };

    const listFavorite = async () => {
        setLoading(true)
        try {
            const response = await listFavorites();
            if (response?.error) {
                setFavorites(null);
                toast.error(response.errorObject.response.data.message);
                console.error('Error al agregar favorito:', response.errorObject.response.data);
                setError('Error al agregar favorito');
            } else {
                setFavorites(response);
            }


        } catch (error) {
            setError("Error al agregar el favorito");
            console.error("Error al agregar el favorito:", err);
        } finally {
            setLoading(false);

        }

    }

    const deleteFavorites = (id) => {
        try {
            const response = deleteFavorite(id)
            if (response?.error) {
                setFavorites(null);
                toast.error(response.errorObject.response.data.message);
                console.error('Error al eliminar favorito:', response.errorObject.response.data);
                setError('Error al eliminar favorito');
            } else {
                toast.success('Favorito eliminado');
                listFavorite()
            }
            
        } catch (error) {
            setError("Error al eliminar el favorito");
            console.error("Error al eliminar el favorito:", err);
        } finally {
            setLoading(false);
            
        }
    }

    useEffect(()=> {
        listFavorite();
    },[])

    return {
        loading,
        addFavorite,
        error,
        favorites,
        listFavorite,
        deleteFavorites
    };
};
