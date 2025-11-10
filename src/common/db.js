import { MongoClient, ServerApiVersion } from 'mongodb'


const uri = "mongodb+srv://ev3_express:DluycwG839eowxMT@ev3-express.yjlhv7n.mongodb.net/?appName=ev3-express"


const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
})


export async function connectDB() {
    try {
        await client.connect()
        await client.db("admin").command({ ping: 1 })
        console.log("✅ Conexión exitosa a MongoDB Atlas")
        return client
    } catch (error) {
        console.error("❌ Error al conectar a MongoDB Atlas:", error)
        throw error
    }
}


export { client }