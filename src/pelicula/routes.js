import express from 'express'
import {
    getAllPeliculas,
    getPeliculaById,
    createPelicula,
    updatePelicula,
    deletePelicula
} from './controller.js'


const peliculaRoutes = express.Router()


peliculaRoutes.get('/', getAllPeliculas)           // GET /api/peliculas
peliculaRoutes.get('/:id', getPeliculaById)        // GET /api/peliculas/:id
peliculaRoutes.post('/', createPelicula)           // POST /api/peliculas
peliculaRoutes.put('/:id', updatePelicula)         // PUT /api/peliculas/:id
peliculaRoutes.delete('/:id', deletePelicula)      // DELETE /api/peliculas/:id

export default peliculaRoutes