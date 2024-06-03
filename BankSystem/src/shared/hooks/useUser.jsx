import { useState } from "react"
import { getLoguedUser } from "../../services/api"
import { useEffect } from "react"

export const useUser = () => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null);


    const fetchUser = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await getLoguedUser();
            if (response.error) {
                console.error('Error al obtener el usuario:', response.error)
                setError('Error al obtener el usuario');
            } else {
                setUser(response.data);
            }
        } catch (error) {
            setError("Error al obtener el usuario");
            console.error("Error al obtener el usuario:", error)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchUser();
    }, []);

  return {
    fetchUser,
    user, 
    loading
  }
        
    
}


