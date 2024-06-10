import { useState } from "react";
import toast from "react-hot-toast";
import { loginRequest, registerAdmin, registerClient } from "../../services/api";

export const useAuth = () => {
    const [isLoading, setIsLoading] = useState(false);

    const login = async (identifier, password) => {
        setIsLoading(true);
        try {
            const isEmail = identifier.includes('@');
            const user = {
                [isEmail ? 'email' : 'username']: identifier,
                password
            };

            const response = await loginRequest(user);
            if (response.error) {
                toast.error(
                    response?.err?.response?.data ||
                    'Email o contraseña incorrectos. Inténtalo de nuevo.'
                );
                return false;
            } else {
                toast.success('¡Has iniciado sesión!');
                // Guardar el token en localStorage
                localStorage.setItem('authToken', response.data.token);
                localStorage.setItem('user', response.data.loggedUser.username);

                return true;
            }

        } catch (error) {
            console.error('Error al iniciar sesión', error);
            toast.error('Error al iniciar sesión');
            return false;

        } finally {
            setIsLoading(false);
        }
    };

    const register = async (userData, role) => {
        setIsLoading(true);
        try {
            let response;
            if (role === 'ADMIN') {
                response = await registerAdmin(userData);
            } else if (role === 'CLIENT') {
                response = await registerClient(userData);
            }

            if (response.error) {
                toast.error(
                    response.error.response?.data?.message ||
                    'Error al registrar usuario. Inténtalo de nuevo.'
                );
                return false;
            } else {
                toast.success('¡Usuario registrado exitosamente!');
                return true;
            }

        } catch (error) {
            console.error('Error al registrar usuario', error);
            toast.error('Error al registrar usuario');
            return false;

        } finally {
            setIsLoading(false);
        }
    };

    return {
        login,
        register,
        isLoading
    };
};
