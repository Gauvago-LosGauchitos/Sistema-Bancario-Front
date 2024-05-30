import axios from 'axios'

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