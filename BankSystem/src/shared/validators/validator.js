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

/*--------------------- VALIDACIÓN DE APELLIDO DE CLIENTE ---------------------------- */
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

/*--------------------- VALIDACIÓN DE DPI ---------------------------- */
export const validateDPI = (DPI) => {
    const regex = /^\d{13}$/
    return regex.test(DPI);
};
/*--------------------- VALIDACIÓN DE DPI ---------------------------- */

/*--------------------- VALIDACIÓN DE TELÉFONO ---------------------------- */
export const validatePhone = (phone) => {
    const regex = /^\d{8}$/
    return regex.test(phone);
};
/*--------------------- VALIDACIÓN DE TELÉFONO ---------------------------- */

/*--------------------- VALIDACIÓN DE NOMBRE DEL TRABAJO ---------------------------- */
export const validateNameOfWork = (nameOfWork) => {
    return nameOfWork.length > 0;
};
/*--------------------- VALIDACIÓN DE NOMBRE DEL TRABAJO ---------------------------- */

/*--------------------- VALIDACIÓN DE INGRESO MENSUAL ---------------------------- */
export const validateMonthlyIncome = (monthlyIncome) => {
    const regex = /^\d+(\.\d{1,2})?$/
    return regex.test(monthlyIncome);
};
/*--------------------- VALIDACIÓN DE INGRESO MENSUAL ---------------------------- */

/* --------------------- MENSAJES DE VALIDACIÓN DE CAMPOS ------------------------------ */
export const usernameValidationMessage = 'El nombre de usuario debe ser de entre 3 y 8 caracteres, sin espacios.'
export const passwordValidationMessage = 'La contraseña debe tener entre 6 y 12 caracteres, sin espacios.'
export const passConfirmValidationMessage = 'Las contraseñas no coinciden'
export const emailValidationMessage = 'Por favor ingresa un correo válido'
export const nameValidationMessage = 'Por favor ingrese un nombre válido sin números ni signos, sin espacios.'
export const surnameValidationMessage = 'Por favor ingrese un apellido válido sin números ni signos, sin espacios.'
export const identifierValidationMessage = 'Por favor ingrese un email o username válido, sin espacios.'
export const DPIValidationMessage = 'El DPI debe ser un número de 13 dígitos.'
export const addressValidationMessage = 'La dirección no puede estar vacía.'
export const phoneValidationMessage = 'El teléfono debe ser un número de 8 dígitos.'
export const nameOfWorkValidationMessage = 'El nombre del trabajo no puede estar vacío.'
export const monthlyIncomeValidationMessage = 'El ingreso mensual debe ser un número válido, con hasta dos decimales.'
/* --------------------- MENSAJES DE VALIDACIÓN DE CAMPOS ------------------------------ */
