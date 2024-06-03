// Función para guardar el token en el almacenamiento local
export const saveToken = (token) => {
    localStorage.setItem('authToken', token);
};

// Función para obtener el token del almacenamiento local
export const getToken = () => {
    return localStorage.getItem('authToken');
};

// Función para eliminar el token del almacenamiento local al cerrar sesión
export const removeToken = () => {
    localStorage.removeItem('authToken');
};