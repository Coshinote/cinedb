import express, { urlencoded } from 'express'
import cors from 'cors'
import { connectDB } from './src/common/db.js'
import peliculaRoutes from './src/pelicula/routes.js'
import actorRoutes from './src/actor/routes.js'


const PORT = process.env.PORT || 3000 || 4000


const app = express()


app.use(express.json())                           
app.use(urlencoded({ extended: true }))           
app.use(cors())                                   


app.get('/', (req, res) => {
    return res.status(200).send('Bienvenido al cine Iplacex')
})


app.use('/api/peliculas', peliculaRoutes)
app.use('/api/actores', actorRoutes)


async function startServer() {
    try {
        
        await connectDB()
        
        
        app.listen(PORT, () => {
            console.log(`✅ Servidor de Express corriendo en http://localhost:${PORT}`)
        })
    } catch (error) {
        console.error('❌ Error al iniciar el servidor:', error)
        process.exit(1) 
    }
}

startServer()