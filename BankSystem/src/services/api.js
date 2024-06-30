import axios from 'axios'
import { getToken } from '../utils/auth'
import toast from "react-hot-toast";


const apiClient = axios.create({
    baseURL: /*'https://sistema-bancario-backend-alpha.vercel.app/' ||*/ 'http://localhost:2670',
    timeout: 90000
})

const exchangeRateApiClient = axios.create({
    baseURL: 'https://v6.exchangerate-api.com/v6/a298a62dc2043d8adf8db469/latest/',
    timeout: 90000
});

export const loginRequest = async (user) => {
    try {
        return await apiClient.post('/user/login', user)

    } catch (err) {
        return {
            error: true,
            err
        }

    }
}

export const getLoguedUser = async () => {
    try {
        const tokenUser = getToken()
        const response = await apiClient.get('/user/getLogued', {
            headers: {
                Authorization: tokenUser
            }
        })
        return response

    } catch (error) {
        return {
            error: true,
            error
        }

    }
}

export const getAdmins = async () => {
    try {
        const response = await apiClient.get('/user/getAdmins')
        return response

    } catch (error) {
        return {
            error: true,
            error
        }

    }
}

export const getUsers = async () => {
    try {
        const response = await apiClient.get('/user/getUsers')
        return response

    } catch (error) {
        return {
            error: true,
            error
        }

    }
}


//Mostros services
export const listarService = async ()=>{
    try {
        const response = await apiClient.get('/services/listarServices')
        return response.data
    } catch (error) {
        return {
            error: true,
            error
        }
    }
}

//Para obtener la divisa de dolar
export const getExchangeRate = async (baseCurrency = 'USD', targetCurrency = 'GTQ') => { //aqui se setea el objetivo de cambio y la base
    try {
        const response = await exchangeRateApiClient.get(`${baseCurrency}`);
        return {
            data: response.data.conversion_rates[targetCurrency]
        };
    } catch (error) {

    }
};


//Para obtener la divisa de euro
export const getExchangeRateEUR = async (baseCurrency = 'EUR', targetCurrency = 'GTQ') => { //aqui se setea el objetivo de cambio y la base
    try {
        const response = await exchangeRateApiClient.get(`${baseCurrency}`);
        return {
            data: response.data.conversion_rates[targetCurrency]
        };
    } catch (error) {

    }
};


//Deposito
export const deposit = async (dep) => {
    try {
        const response = await apiClient.post('/transfer/deposit', dep)
        return response

    } catch (error) {
        return {
            error: true,
            error
        }
    }
}

//Compra
export const buyed = async (service) => {
    try {
        const response = await apiClient.post('/transfer/buyed',{service},{
            headers: {
                'Authorization': localStorage.getItem('authToken') 
            }
        })
        return response
    } catch (error) {
        toast.error(error.response.data.message)
    }
}
    

//Transferencia 
export const transfer = async (data) => {
    try {
        const response = await apiClient.post('/transfer/transfer', data, {
            headers: {
                'Authorization': localStorage.getItem('authToken')
            }
        })
        return response
    } catch (error) {
        return {
            error: true,
            error
        }
    }
}

//Revertir tranferencia
export const reverTransfer = async (idTransfer) => {
    try {
        const response = await apiClient.post('/transfer/revertTransfer', idTransfer, {
            headers: {
                'Authorization': localStorage.getItem('authToken')
            }
        })
        return response
    } catch (error) {
        return {
            error: true,
            error
        }
    }
}

// Register admin
export const registerAdmin = async (userData) => {
    try {
        const response = await apiClient.post('/user/registerAd', userData, {
            headers: {
                'Authorization': localStorage.getItem('authToken') // Obtener el token del localStorage
            }
        });
        return response;
    } catch (error) {
        console.error(error)
        return {
            error: true,
            error
        };
    }
};

// Register client
export const registerClient = async (userData) => {
    try {
        const response = await apiClient.post('/user/registerC', userData, {
            headers: {
                'Authorization': localStorage.getItem('authToken') // Obtener el token del localStorage
            }
        });
        return response;
    } catch (error) {
        return {
            error: true,
            error
        };
    }
};

//Delete user
export const deleteUser = async (userData) => {
    try {
        const response = await apiClient.delete('/user/deleteU', {
            headers: {
                'Authorization': localStorage.getItem('authToken') // Obtener el token del localStorage
            },
            data: userData
        });
        return response;
    } catch (error) {
        console.error(error)
        return {
            error: true,
            errorObject: error
        };
    }
};

// buscar un usuario por nombre de usuario
export const findUserByUsername = async (username) => {
    console.log(username)
    try {
        const response = await apiClient.post('/user/findUserByUsername', { username }, {
            headers: {
                'Authorization': localStorage.getItem('authToken')
            }
        });
        return response.data.user;
    } catch (error) {
        console.error(error);
        return {
            error: true,
            errorObject: error
        };
    }
};

// Editar usuario con admin
export const editUserAD = async (username, userData) => {
    try {
        const response = await apiClient.put('/user/updateUAd', { username, ...userData }, {
            headers: {
                'Authorization': localStorage.getItem('authToken')
            }
        });
        return response;
    } catch (error) {
        console.error(error);
        return {
            error: true,
            errorObject: error
        };
    }
};

// Editar usuario sin admin
export const editUser = async (username, userData) => {
    try {
        const response = await apiClient.put('/user/updateU', { username, ...userData }, {
            headers: {
                'Authorization': getToken()
            }
        });
        return response;
    } catch (error) {
        console.error(error);
        return {
            error: true,
            errorObject: error
        };
    }
};

//Historial del usuario
export const getUserHistory = async () => {
    try {
        const response = await apiClient.get('/transfer/getTransferHistory', {
            headers: {
                'Authorization': localStorage.getItem('authToken')
            }
        });
        return response
    } catch (error) {
        console.error(error);
        return {
            error: true,
            errorObject: error
        };

    }
}

//Ultimos 5 movimientos de un usuario
export const getLastMovements = async (userId) => {
    try {
        const response = await apiClient.post('/transfer/getLastFiveTransfers', { userId }, {
            headers: {
                'Authorization': localStorage.getItem('authToken')
            }
        }
        )
        return response;

    } catch (error) {
        console.error(error);
        return {
            error: true,
            errorObject: error
        };
    }
}

//Cuentas con mas movimiento
export const getAccountsMovements = async () => {
    try {
        const response = await apiClient.get('/transfer/getAccountsByMovements', {
            headers: {
                'Authorization': localStorage.getItem('authToken')
            }
        })
        return response


    } catch (error) {
        console.error(error);
        return {
            error: true,
            errorObject: error
        };

    }
}

//Carga de imagenes
export const uploadImageRequest = async (formData) => {
    console.log(formData)
    try {
        const response = await apiClient.post('/user/upload-image', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': localStorage.getItem('authToken') // Obtener el token del localStorage
            }
        });

        // Devuelve la URL de la imagen desde la respuesta del backend
        return response.data.imageUrl;
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
};

// Función para buscar un usuario por nombre de usuario y obtener su cuenta asociada
export const findUserAndAccountByUsername = async (username) => {
    try {
        const response = await apiClient.post(
            '/user/findUserAndAccountByUsername',
            { username },
            {
                headers: {
                    Authorization: localStorage.getItem('authToken'),
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error finding user by username:', error);
        toast.error(error.response.data.message);
        throw error;
    }
};

// Función para buscar usuarios por coincidencia de nombre de usuario
export const searchUsersByUsername = async (username) => {
    try {
        const response = await apiClient.post('/user/search', { username });
        return response.data.users;
    } catch (error) {
        console.error('Error searching users by username:', error);
        toast.error(error.response.data.message);
        throw error;
    }
};

//Funcion para agregar favoritos
export const addFavorite = async (data) => {
    try {
        const response = await apiClient.post('/favorite/register', data, {
            headers: {
                Authorization: localStorage.getItem('authToken'),
            },
        })

        return response.data


    } catch (error) {
        error: true
        errorObject: error
        console.error('Error searching users by username:', error);
        toast.error(error.response.data.message);
        throw error;
    }
}

//Listar favoritos de un usuario
export const listFavorites = async () => {
    try {
        const response = await apiClient.get('/favorite/obtener', {
            headers: {
                Authorization: localStorage.getItem('authToken'),
            },
        })
        return response.data
    } catch (error) {
        error: true
        errorObject: error
        console.error('Error searching favorites:', error);
        toast.error(error.response.data.message);
        throw error;
    }
}
//Eliminar favorito
export const deleteFavorite = async (id) => {
    try {
        const response = await apiClient.delete(`/favorite/deleteF/${id}`, {
            headers: {
                'Authorization': localStorage.getItem('authToken')
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting favorite:', error);
        toast.error(error.response.data.message);
        throw error;
    }
}

//Agragar un servicio
export const addService = async (data) => {
    console.log(data);
    try {
        const response = await apiClient.post('/services/register', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': localStorage.getItem('authToken')
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error al agregar el servicio:', error);
        throw error;
    }
};
