import express from 'express'
import {
    getAllActores,
    getActorById,
    createActor,
    updateActor,
    deleteActor
} from './controller.js'

// Crear la instancia del router
const actorRoutes = express.Router()

// Definir las rutas
actorRoutes.get('/', getAllActores)           // GET /api/actores
actorRoutes.get('/:id', getActorById)         // GET /api/actores/:id
actorRoutes.post('/', createActor)            // POST /api/actores
actorRoutes.put('/:id', updateActor)          // PUT /api/actores/:id
actorRoutes.delete('/:id', deleteActor)       // DELETE /api/actores/:id

export default actorRoutes