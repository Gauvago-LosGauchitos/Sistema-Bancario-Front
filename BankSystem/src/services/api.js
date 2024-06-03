import axios from 'axios'
import { getToken } from '../utils/auth'

const apiClient = axios.create({
    baseURL: 'http://localhost:2670',
    timeout: 30000
})

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