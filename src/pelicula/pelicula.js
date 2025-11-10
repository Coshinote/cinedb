export const Pelicula = {
    _id: Object,                       // ObjectId MongoDB lo genera automáticamente.
    nombre: String,                    // Nombre de la película
    generos: Array,                    // Array de géneros ej: "Drama", "Acción"
    anioEstreno: Number                // Año de estreno (tipo int)
}

export function validarPelicula(pelicula) {
    const errores = []
    
    if (!pelicula.nombre || typeof pelicula.nombre !== 'string') {
        errores.push('El nombre es requerido y debe ser texto')
    }
    
    if (pelicula.nombre && pelicula.nombre.trim().length === 0) {
        errores.push('El nombre no puede estar vacío')
    }
    
    if (!pelicula.generos) {
        errores.push('Los géneros son requeridos')
    } else if (!Array.isArray(pelicula.generos)) {
        errores.push('Los géneros deben ser un array')
    } else if (pelicula.generos.length === 0) {
        errores.push('Debe incluir al menos un género')
    } else {
        const todosStrings = pelicula.generos.every(genero => typeof genero === 'string')
        if (!todosStrings) {
            errores.push('Todos los géneros deben ser texto')
        }
    }
    
    if (!pelicula.anioEstreno) {
        errores.push('El año de estreno es requerido')
    } else if (typeof pelicula.anioEstreno !== 'number' || !Number.isInteger(pelicula.anioEstreno)) {
        errores.push('El año de estreno debe ser un número entero')
    } else if (pelicula.anioEstreno < 1888) {
        errores.push('El año de estreno debe ser mayor o igual a 1888')
    } else if (pelicula.anioEstreno > new Date().getFullYear() + 5) {
        errores.push('El año de estreno no puede ser tan lejano en el futuro')
    }
    
    return {
        valido: errores.length === 0,
        errores
    }
}

export function crearPelicula(nombre, generos, anioEstreno) {
    return {
        nombre: nombre,
        generos: generos,
        anioEstreno: anioEstreno
    }
}