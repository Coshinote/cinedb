import { client } from '../common/db.js'
import { ObjectId } from 'mongodb'
import { validarActor } from './actor.js'


const actorCollection = client.db('cine-db').collection('actores')


export async function getAllActores(req, res) {
    try {
        const actores = await actorCollection.find({}).toArray()
        
        return res.status(200).json({
            success: true,
            total: actores.length,
            data: actores
        })
    } catch (error) {
        console.error('Error al obtener actores:', error)
        return res.status(500).json({
            success: false,
            message: 'Error al obtener los actores',
            error: error.message
        })
    }
}


export async function getActorById(req, res) {
    try {
        const { id } = req.params
        
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'ID de actor inválido'
            })
        }
        
        const actor = await actorCollection.findOne({ 
            _id: new ObjectId(id) 
        })
        
        if (!actor) {
            return res.status(404).json({
                success: false,
                message: 'Actor no encontrado'
            })
        }
        
        return res.status(200).json({
            success: true,
            data: actor
        })
    } catch (error) {
        console.error('Error al obtener actor:', error)
        return res.status(500).json({
            success: false,
            message: 'Error al obtener el actor',
            error: error.message
        })
    }
}


export async function createActor(req, res) {
    try {
        const nuevoActor = req.body
        
        const validacion = validarActor(nuevoActor)
        if (!validacion.valido) {
            return res.status(400).json({
                success: false,
                message: 'Datos de actor inválidos',
                errores: validacion.errores
            })
        }
        
        const resultado = await actorCollection.insertOne(nuevoActor)
        
        return res.status(201).json({
            success: true,
            message: 'Actor creado exitosamente',
            data: {
                _id: resultado.insertedId,
                ...nuevoActor
            }
        })
    } catch (error) {
        console.error('Error al crear actor:', error)
        return res.status(500).json({
            success: false,
            message: 'Error al crear el actor',
            error: error.message
        })
    }
}


export async function updateActor(req, res) {
    try {
        const { id } = req.params
        const datosActualizados = req.body
        
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'ID de actor inválido'
            })
        }
        
        const validacion = validarActor(datosActualizados)
        if (!validacion.valido) {
            return res.status(400).json({
                success: false,
                message: 'Datos de actor inválidos',
                errores: validacion.errores
            })
        }
        
        const resultado = await actorCollection.updateOne(
            { _id: new ObjectId(id) },
            { $set: datosActualizados }
        )
        
        if (resultado.matchedCount === 0) {
            return res.status(404).json({
                success: false,
                message: 'Actor no encontrado'
            })
        }
        
        return res.status(200).json({
            success: true,
            message: 'Actor actualizado exitosamente',
            data: {
                _id: id,
                ...datosActualizados
            }
        })
    } catch (error) {
        console.error('Error al actualizar actor:', error)
        return res.status(500).json({
            success: false,
            message: 'Error al actualizar el actor',
            error: error.message
        })
    }
}


export async function deleteActor(req, res) {
    try {
        const { id } = req.params
        
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'ID de actor inválido'
            })
        }
        
        const resultado = await actorCollection.deleteOne({ 
            _id: new ObjectId(id) 
        })
        
        if (resultado.deletedCount === 0) {
            return res.status(404).json({
                success: false,
                message: 'Actor no encontrado'
            })
        }
        
        return res.status(200).json({
            success: true,
            message: 'Actor eliminado exitosamente'
        })
    } catch (error) {
        console.error('Error al eliminar actor:', error)
        return res.status(500).json({
            success: false,
            message: 'Error al eliminar el actor',
            error: error.message
        })
    }
}