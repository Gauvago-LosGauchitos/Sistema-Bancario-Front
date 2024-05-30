import { useState } from "react"
import toast from "react-hot-toast"
import { loginRequest } from "../../services/api"

export const useAuth = () => {
    const [isLoading, setIsLoading] = useState(false)

    const login = async (identifier, password)=>{
        setIsLoading(true)
        try {
            const isEmail = identifier.includes('@')
            const user = {
                [isEmail ? 'email' : 'username']:  identifier,
                password
            }

            const response = await loginRequest(user)
            if (response.error) {
                toast.error(
                    response?.e?.response?.data ||
                    'Email o contraseña incorrectos. Inténtalo de nuevo.'
                );
                return false;
            } else {
                toast.success('¡Has iniciado sesión!');
                // Guardar el token en localStorage
                localStorage.setItem('authToken', response.data.token);

                return true;
            }
            
        } catch (error) {
            console.error('Error al iniciar sesion', error)
            toast.error('Error al iniciar sesion')
            return false
            
        } finally{
            setIsLoading(false)
        }
    }

  return {
    login,
    isLoading
  }
}

