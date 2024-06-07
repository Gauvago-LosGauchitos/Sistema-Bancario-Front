import axios from 'axios'
import { getToken } from '../utils/auth'

const apiClient = axios.create({
    baseURL: 'http://localhost:2670',
    timeout: 30000
})

const exchangeRateApiClient = axios.create({
    baseURL: 'https://v6.exchangerate-api.com/v6/a298a62dc2043d8adf8db469/latest/',
    timeout: 30000
});

export const loginRequest = async (user)=>{
    try {
        return await apiClient.post('/user/login', user)
        
    } catch (err) {
        return{
            error: true,
            err
        }
        
    }
}

export const getLoguedUser = async ()=>{
    try {
        const tokenUser = getToken()
        const response = await apiClient.get('/user/getLogued', {
            headers: {
                Authorization: tokenUser
            }
        })
        return response
        
    } catch (error) {
        return{
            error: true,
            error
        }
        
    }
}

export const getAdmins = async()=>{
    try {
        const response = await apiClient.get('/user/getAdmins')
        return response
        
    } catch (error) {
        return{
            error: true,
            error
        }
        
    }
}

export const getUsers = async()=>{
    try {
        const response = await apiClient.get('/user/getUsers')
        return response
        
    } catch (error) {
        return{
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
        return {
            error: true,
            error
        };
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
        return {
            error: true,
            error
        };
    }
};