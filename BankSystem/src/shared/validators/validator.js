/*--------------------- VALIDACIÓN DE CORREO ---------------------------- */
export const validateEmail = (email)=>{
    const regex = /\S+@\S+\.\S+/
    return regex.test(email)
}
/*--------------------- VALIDACIÓN DE CORREO ---------------------------- */

/*--------------------- VALIDACIÓN DE NOMBRE DE USUARIO ---------------------------- */
export const validateUsername = (username)=>{
    const regex = /^\S{3,8}$/
    return regex.test(username)
}
/*--------------------- VALIDACIÓN DE NOMBRE DE USUARIO ---------------------------- */

/*--------------------- VALIDACIÓN DE CONTRASEÑA ---------------------------- */
export const validatePassword = (password)=>{
    const regex = /^\S{6,12}$/
    return regex.test(password)
}
/*--------------------- VALIDACIÓN DE CONTRASEÑA ---------------------------- */

/*--------------------- VALIDACIÓN DE CONFIRMACIÓN DE CONTRASEÑA ---------------------------- */
export const validatePassConfirm = (password, passConfirm)=>{
    return password === passConfirm
}
/*--------------------- VALIDACIÓN DE CONFIRMACIÓN DE CONTRASEÑA ---------------------------- */

/*--------------------- VALIDACIÓN DE NOMBRE DE CLIENTE ---------------------------- */
export const validateName  = (name)=>{
    const regex = /^[A-Z][a-z]{2,24}$/
    return regex.test(name)
}
/*--------------------- VALIDACIÓN DE NOMBRE DE CLIENTE ---------------------------- */

/*--------------------- VALIDACIÓN DE APELLIDO DE CLEINTE ---------------------------- */
export const validateSurname = (surname)=>{
    const regex = /^[A-Z][a-z]{2,24}$/
    return regex.test(surname)
}
/*--------------------- VALIDACIÓN DE APELLIDO DE CLIENTE ---------------------------- */

/*--------------------- VALIDACIÓN DE IDENTIFICADOR (EMAIL O USUARIO) ---------------------------- */
export const validateIdentifier = (identifier)=>{
    if (identifier.includes('@')) {
        const emailRegex = /\S+@\S+\.\S+/
        return emailRegex.test(identifier)
    } else {
        const usernameRegex = /^\S+$/
        return usernameRegex.test(identifier)
    }
}
/*--------------------- VALIDACIÓN DE IDENTIFICADOR (EMAIL O USUARIO) ---------------------------- */

/*--------------------- VALIDACIÓN DE DIRECCIÓN ---------------------------- */
export const validateAddress = (address) => {
    return address.length > 0;
};
/*--------------------- VALIDACIÓN DE DIRECCIÓN ---------------------------- */


/* --------------------- MENSAJES DE VALIDACIÓN DE CAMPOS ------------------------------ */
export const usernameValidationMessage = 'El nombre de usuario debe ser de entre 3 y 8 caracteres, sin espacios.'
export const passwordValidationMessage = 'La contraseña debe tener entre 6 y 12 caracteres, sin espacios'
export const passConfirmValidationMessage = 'Las contraseñas no coinciden'
export const emailValidationMessage = 'Por favor ingresa un correo válido'
export const nameValidationMessage = 'Por favor ingrese un nombre valido sin numeros ni signos, sin espacios.'
export const surnameValidationMessage = 'Por favor ingrese un apellido valido sin numeros ni signos, sin espacios.'
export const identifierValidationMessage = 'Por favor ingrese un email o username valido, sin espacios.'
/* --------------------- MENSAJES DE VALIDACIÓN DE CAMPOS ------------------------------ */