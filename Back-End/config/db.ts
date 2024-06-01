import mongoose from 'mongoose'
import { EnvConfig } from './environmentVarialbes'
import { Express } from 'express'

console.log(EnvConfig.MONGODB_URL)
export const dbConnect = async (app: Express) => {
    try {
        console.log('Connecting to MongoDB...')
        const conn = await mongoose.connect(EnvConfig.MONGODB_URL)
        console.log(`MongoDB Connected: ${conn.connection.host}`)
        app.listen(EnvConfig.PORT, () => console.log(`Server running on port ${EnvConfig.PORT}`))
    } catch (error: any) {
        console.error(`Error: ${error.message}`)
        process.exit(1)
    }
}