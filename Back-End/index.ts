import expres, { Request, Response, Express } from 'express'
import dotenv from 'dotenv'
dotenv.config()

import { dbConnect } from './config/db'
import { errorHandler } from './middlewares/errorHandler/errorHandler'
import userRouter from './routes/userRoutes'
import fileUploadRouter from './routes/fileUploadRoutes'
import fileupload from 'express-fileupload'

const app: Express = expres()

app.use(expres.json())
app.use(fileupload({ useTempFiles: true, limits: { fileSize: 50 * 1024 * 1024 }, },));

app.use('/api/v1/user', userRouter)
app.use('/api/v1/file-upload', fileUploadRouter)
app.use(errorHandler)
dbConnect(app)