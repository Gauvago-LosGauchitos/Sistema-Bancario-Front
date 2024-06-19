import axios from 'axios'
import { getToken } from '../utils/auth'
import toast from "react-hot-toast";


const apiClient = axios.create({
    baseURL: 'http://localhost:2670',
    timeout: 30000
})

const exchangeRateApiClient = axios.create({
    baseURL: 'https://v6.exchangerate-api.com/v6/a298a62dc2043d8adf8db469/latest/',
    timeout: 30000
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
        return response
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
export const deposit = async () => {
    try {
        const response = await apiClient.post('/transfer/deposit')
        return response

    } catch (error) {
        return {
            error: true,
            error
        }
    }
}

//Compra
export const buyed = async () => {
    try {
        const response = await apiClient.post('/transfer/buyed')
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

// Editar usuario
export const editUser = async (username, userData) => {
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

//Historial del usuario
export const getUserHistory = async (username) => {
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
        const response = await apiClient.post('/transfer/getLastFiveTransfers', {
            headers:{
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
