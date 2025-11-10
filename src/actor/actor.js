export const Actor = {
    _id: Object,
    idPelicula: String,
    nombre: String,
    edad: Number,
    estaRetirado: Boolean,
    premios: Array
}

export function validarActor(actor) {
    const errores = []
    
    if (!actor.idPelicula || typeof actor.idPelicula !== 'string') {
        errores.push('El idPelicula es requerido y debe ser texto')
    }
    
    if (actor.idPelicula && actor.idPelicula.trim().length === 0) {
        errores.push('El idPelicula no puede estar vacío')
    }
    
    if (!actor.nombre || typeof actor.nombre !== 'string') {
        errores.push('El nombre es requerido y debe ser texto')
    }
    
    if (actor.nombre && actor.nombre.trim().length === 0) {
        errores.push('El nombre no puede estar vacío')
    }
    
    if (actor.edad === undefined || actor.edad === null) {
        errores.push('La edad es requerida')
    } else if (typeof actor.edad !== 'number' || !Number.isInteger(actor.edad)) {
        errores.push('La edad debe ser un número entero')
    } else if (actor.edad < 0) {
        errores.push('La edad debe ser mayor o igual a 0')
    } else if (actor.edad > 150) {
        errores.push('La edad debe ser menor o igual a 150')
    }
    
    if (actor.estaRetirado === undefined || actor.estaRetirado === null) {
        errores.push('El campo estaRetirado es requerido')
    } else if (typeof actor.estaRetirado !== 'boolean') {
        errores.push('El campo estaRetirado debe ser booleano (true o false)')
    }
    
    if (!actor.premios) {
        errores.push('Los premios son requeridos')
    } else if (!Array.isArray(actor.premios)) {
        errores.push('Los premios deben ser un array')
    } else {
        const todosStrings = actor.premios.every(premio => typeof premio === 'string')
        if (!todosStrings) {
            errores.push('Todos los premios deben ser texto')
        }
    }
    
    return {
        valido: errores.length === 0,
        errores
    }
}

export function crearActor(idPelicula, nombre, edad, estaRetirado, premios) {
    return {
        idPelicula: idPelicula,
        nombre: nombre,
        edad: edad,
        estaRetirado: estaRetirado,
        premios: premios
    }
}