import { client } from '../common/db.js'
import { ObjectId } from 'mongodb'
import { validarPelicula } from './pelicula.js'

// Creacion de la constante global para acceder a la colección
const peliculaCollection = client.db('cine-db').collection('peliculas')


export async function getAllPeliculas(req, res) {
    try {
        const peliculas = await peliculaCollection.find({}).toArray()
        
        return res.status(200).json({
            success: true,
            total: peliculas.length,
            data: peliculas
        })
    } catch (error) {
        console.error('Error al obtener películas:', error)
        return res.status(500).json({
            success: false,
            message: 'Error al obtener las películas',
            error: error.message
        })
    }
}


export async function getPeliculaById(req, res) {
    try {
        const { id } = req.params
        
        
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'ID de película inválido'
            })
        }
        
        const pelicula = await peliculaCollection.findOne({ 
            _id: new ObjectId(id) 
        })
        
        if (!pelicula) {
            return res.status(404).json({
                success: false,
                message: 'Película no encontrada'
            })
        }
        
        return res.status(200).json({
            success: true,
            data: pelicula
        })
    } catch (error) {
        console.error('Error al obtener película:', error)
        return res.status(500).json({
            success: false,
            message: 'Error al obtener la película',
            error: error.message
        })
    }
}


export async function createPelicula(req, res) {
    try {
        const nuevaPelicula = req.body
        
        
        const validacion = validarPelicula(nuevaPelicula)
        if (!validacion.valido) {
            return res.status(400).json({
                success: false,
                message: 'Datos de película inválidos',
                errores: validacion.errores
            })
        }
        
        
        const resultado = await peliculaCollection.insertOne(nuevaPelicula)
        
        return res.status(201).json({
            success: true,
            message: 'Película creada exitosamente',
            data: {
                _id: resultado.insertedId,
                ...nuevaPelicula
            }
        })
    } catch (error) {
        console.error('Error al crear película:', error)
        return res.status(500).json({
            success: false,
            message: 'Error al crear la película',
            error: error.message
        })
    }
}


export async function updatePelicula(req, res) {
    try {
        const { id } = req.params
        const datosActualizados = req.body
        
        
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'ID de película inválido'
            })
        }
        
        
        const validacion = validarPelicula(datosActualizados)
        if (!validacion.valido) {
            return res.status(400).json({
                success: false,
                message: 'Datos de película inválidos',
                errores: validacion.errores
            })
        }
        
        
        const resultado = await peliculaCollection.updateOne(
            { _id: new ObjectId(id) },
            { $set: datosActualizados }
        )
        
        if (resultado.matchedCount === 0) {
            return res.status(404).json({
                success: false,
                message: 'Película no encontrada'
            })
        }
        
        return res.status(200).json({
            success: true,
            message: 'Película actualizada exitosamente',
            data: {
                _id: id,
                ...datosActualizados
            }
        })
    } catch (error) {
        console.error('Error al actualizar película:', error)
        return res.status(500).json({
            success: false,
            message: 'Error al actualizar la película',
            error: error.message
        })
    }
}


export async function deletePelicula(req, res) {
    try {
        const { id } = req.params
        
        
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'ID de película inválido'
            })
        }
        
        
        const resultado = await peliculaCollection.deleteOne({ 
            _id: new ObjectId(id) 
        })
        
        if (resultado.deletedCount === 0) {
            return res.status(404).json({
                success: false,
                message: 'Película no encontrada'
            })
        }
        
        return res.status(200).json({
            success: true,
            message: 'Película eliminada exitosamente'
        })
    } catch (error) {
        console.error('Error al eliminar película:', error)
        return res.status(500).json({
            success: false,
            message: 'Error al eliminar la película',
            error: error.message
        })
    }
}