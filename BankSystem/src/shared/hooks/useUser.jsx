import { useState, useEffect, useCallback } from "react";
import { getLoguedUser, getAdmins, getUsers, deleteUser, findUserByUsername, editUser, getExchangeRate, getExchangeRateEUR, getUserHistory, getLastMovements, getAccountsMovements, uploadImageRequest, findUserAndAccountByUsername, searchUsersByUsername } from "../../services/api"; // Import editUser
import toast from "react-hot-toast";
import { getToken } from "../../utils/auth";
import { jwtDecode } from "jwt-decode";

export const useUser = () => {
    const [user, setUser] = useState(null);
    const [userFound, setUserFound] = useState(null);
    const [userFive, setUserFive] = useState(null)
    const [admins, setAdmins] = useState([]);
    const [imageUrl, setImageUrl] = useState(null);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [topAccounts, setTopAccounts] = useState(null)
    const [exchangeRate, setExchangeRate] = useState(null);
    const [exchangeRateEUR, setExchangeRateEUR] = useState(null);
    const [history, setHistory] = useState()
    const [params, setParams] = useState()
    const [userResult, setUserResult] = useState(null)


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

        }
    };


    //Eliminar un usuario
    const deleteUserHandler = async (username) => {
        try {
            const response = await deleteUser({ username });
            if (response.error) {
                console.error('Error al eliminar el usuario:', response.error);
                setError('Error al eliminar el usuario');
            } else {
                // Actualizar la lista de usuarios y admins después de eliminar
                await fetchUsers();
                await fetchAdmins();
            }
        } catch (error) {
            setError("Error al eliminar el usuario");
            console.error("Error al eliminar el usuario:", error);
        }
    };

    // buscar un usuario por su nombre de usuario
    const searchUser = async (username) => {
        setLoading(true);
        setError(null);
        try {
            const response = await findUserByUsername(username);
            if (response.error) {
                setUserFound(null)
                const errorData = response.errorObject.response.data.message
                toast.error(errorData)
                console.error('Error al buscar el usuario:', response.errorObject.response.data);
                setError('Error al buscar el usuario');
            } else {
                setUserFound(response);
            }
        } catch (error) {
            setError("Error al buscar el usuario");
            console.error("Error al buscar el usuario:", error);
        } finally {
            setLoading(false);
        }
    };

    // Editar un usuario
    const handleUpdateUser = async (userData) => {
        setLoading(true);
        setError(null);

        if (userData.role === 'ADMIN') {
            toast.error('No puedes actualizar a un admin');
            setLoading(false);
            return;
        }

        try {
            const authToken = getToken();
            const decodedToken = jwtDecode(authToken);
            const loggedUsername = decodedToken.username;

            if (loggedUsername !== userData.username) {
                throw new Error('No tienes permiso para actualizar este perfil');
            }

            const response = await editUser(loggedUsername, userData);

            if (response.error) {
                console.error('Error al actualizar el usuario:', response.error);
                setError('Error al actualizar el usuario');
            } else {
                await fetchUsers();
                await fetchAdmins();
            }
        } catch (error) {
            setError("Error al actualizar el usuario");
            console.error("Error al actualizar el usuario:", error);
        } finally {
            setLoading(false);
        }
    };

    const editUserHandler = async (username, userData) => {
        setLoading(true);
        setError(null);
        if (userData.role === 'ADMIN') {
            toast.error('No puedes actualizar a un admin')
        }

        try {
            const response = await editUser(username, userData);
            if (response.error) {
                console.error('Error al actualizar el usuario:', response.error);
                setError('Error al actualizar el usuario');
            } else {
                await fetchUsers();
                await fetchAdmins();
            }
        } catch (error) {
            setError("Error al actualizar el usuario");
            console.error("Error al actualizar el usuario:", error);
        } finally {
            setLoading(false);
        }
    };

    //Historial del usuario
    const fetchUserHistory = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await getUserHistory()
            if (response.error) {
                console.error('Error al obtener el tipo de cambio:', response.error);
                setError('Error al obtener el tipo de cambio');
            } else {
                setHistory(response.data);
            }

        } catch (error) {
            setError("Error al obtener el historial del usuario");
            console.error("Error al obtener el historial del usuario:", error);

        } finally {
            setLoading(false);
        }

    }

    //Obtener ultimos 5 movimientos de un usuario
    const fetchLastMovements = async (userId) => {
        setUserFive(null)
        try {
            const response = await getLastMovements(userId)
            if (response.error) {
                console.error('Error al obtener el tipo de cambio:', response.error);
                setError('Error al obtener el tipo de cambio');
            } else {
                setUserFive(response.data);
            }

        } catch (error) {

            setError("Error al Encontrar los ultimos 5 movimientos del usuario");
            console.error("Error encontrar los ultimos 5 movimientos del usuario:", error);

        } finally {
            setLoading(false);
        }
    }

    //Obtener las cuentas con mas movimiento
    const fetchTopAccounts = async () => {
        try {
            const response = await getAccountsMovements()
            if (response.error) {
                console.error('Error al obtener las cuentas con mas movimiento', response.error);
                setError('Error al obtener las cuentas con mas movimiento');
            } else {
                setTopAccounts(response.data.accounts);
            }


        } catch (error) {
            setError("Error al Encontrar las cuentas con mas movimientos ");
            console.error("Error al Encontrar las cuentas con mas movimientos", error);

        } finally {
            setLoading(false);
        }
    }

    //Carga de imagenes
    const handleUploadImage = async (imageFile) => {
        setLoading(true);
        setError(null);

        try {
            const response = await uploadImageRequest(imageFile);
            setImageUrl(response.data.imageUrl);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(error.response?.data?.message || 'Error uploading image');
        }
    };

    const searchUserByUsername = async (username) => {
        setLoading(true);
        setError(null);
        try {
            const response = await findUserAndAccountByUsername(username);
            if (response.error) {
                setUserFound(null);
                toast.error(response.errorObject.response.data.message);
                console.error('Error al buscar el usuario:', response.errorObject.response.data);
                setError('Error al buscar el usuario');
            } else {
                setUserResult(response);
                console.log('UserResult:', response); // Asegúrate de que los datos están correctos
            }
        } catch (error) {
            setError("Error al buscar el usuario");
            console.error("Error al buscar el usuario:", error);
        } finally {
            setLoading(false);
        }
    };

    //Para mostrar coincidencias
    const handleSearchByUsername = async (username) => {
        try {
            const response = await searchUsersByUsername(username);
            if (response.error) {
                setUserFound(null);
                toast.error(response.errorObject.response.data.message);
                console.error('Error al buscar el usuario:', response.errorObject.response.data);
                setError('Error al buscar el usuario');
            } else {
                setParams(response);
            }
            
        } catch (error) {
            setError("Error al buscar el usuario");
            console.error("Error al buscar el usuario:", error);
        } finally {
            setLoading(false);
        }
            
        }
        

        const isUserLoaded = !!userResult;



    useEffect(() => {
        fetchUser();
        fetchAdmins();
        fetchUsers();
        fetchUserHistory()
        fetchTopAccounts()
        fetchExchangeRate()
        fetchExchangeRateEUR()
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
        exchangeRateEUR,
        deleteUserHandler,
        searchUser,
        setUserFound,
        handleUpdateUser,
        history,
        fetchLastMovements,
        userFive,
        setUserFive,
        topAccounts,
        imageUrl,
        handleUploadImage,
        searchUserByUsername,
        params,
        setParams,
        handleSearchByUsername,
        userFound,
        userResult,
        isUserLoaded,
        editUserHandler,
        fetchExchangeRate,
        fetchExchangeRateEUR
    };
};
