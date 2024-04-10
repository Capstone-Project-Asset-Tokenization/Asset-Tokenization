import express from 'express'
import FileUploadController from '../controllers/fileUploadController'
import { FileUploadService } from '../services/fileUpload'
const fileUploadRouter = express.Router()

const fileUploadService = new FileUploadService()
const fileUploadController = new FileUploadController(fileUploadService)

fileUploadRouter.post('/single', fileUploadController.uploadFile)
fileUploadRouter.post('/multiple', fileUploadController.uploadFiles)

export default fileUploadRouter