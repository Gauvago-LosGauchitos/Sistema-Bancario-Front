import { useState, useEffect } from "react";
import { getLoguedUser, getAdmins, getUsers, getExchangeRate, getExchangeRateEUR } from "../../services/api";

export const useUser = () => {
    const [user, setUser] = useState(null);
    const [admins, setAdmins] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [exchangeRate, setExchangeRate] = useState(null);
    const [exchangeRateEUR, setExchangeRateEUR] = useState(null);


    const fetchUser = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await getLoguedUser();
            if (response.error) {
                console.error('Error al obtener el usuario:', response.error);
                setError('Error al obtener el usuario');
            } else {
                setUser(response.data);
            }
        } catch (error) {
            setError("Error al obtener el usuario");
            console.error("Error al obtener el usuario:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchAdmins = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await getAdmins();
            if (response.error) {
                console.error('Error al obtener los administradores:', response.error);
                setError('Error al obtener los administradores');
            } else {
                setAdmins(response.data.admins);
            }
        } catch (error) {
            setError("Error al obtener los administradores");
            console.error("Error al obtener los administradores:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchUsers = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await getUsers();
            if (response.error) {
                console.error('Error al obtener los usuarios:', response.error);
                setError('Error al obtener los usuarios');
            } else {
                setUsers(response.data.users);
            }
        } catch (error) {
            setError("Error al obtener los usuarios");
            console.error("Error al obtener los usuarios:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchExchangeRate = async () => {
        try {
            const response = await getExchangeRate();
            if (response.error) {
                console.error('Error al obtener el tipo de cambio:', response.error);
                setError('Error al obtener el tipo de cambio');
            } else {
                setExchangeRate(response.data);
            }
        } catch (error) {
            setError("Error al obtener el tipo de cambio");
            console.error("Error al obtener el tipo de cambio:", error);
        }
    };

    const fetchExchangeRateEUR = async () => {
        try {
            const response = await getExchangeRateEUR();
            if (response.error) {
                console.error('Error al obtener el tipo de cambio:', response.error);
                setError('Error al obtener el tipo de cambio');
            } else {
                setExchangeRateEUR(response.data);
            }
        } catch (error) {
            setError("Error al obtener el tipo de cambio");
            console.error("Error al obtener el tipo de cambio:", error);
        }
    };

    useEffect(() => {
        fetchUser();
        fetchAdmins();
        fetchUsers();
        fetchExchangeRate();
        fetchExchangeRateEUR();
    }, []);


    return {
        fetchUser,
        user,
        loading,
        fetchAdmins,
        fetchUsers,
        admins,
        users,
        exchangeRate,
        exchangeRateEUR
    };
};
