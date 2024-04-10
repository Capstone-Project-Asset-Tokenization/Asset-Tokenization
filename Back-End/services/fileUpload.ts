import { response } from "express";
import { uploadFile } from "../utils/fileStorage/storage";

export class FileUploadService {
    async uploadFile(file: any, fileName: string = 'file') {
        const response = await uploadFile(file.tempFilePath, fileName)
        return response
    }

    async uploadFiles(files: any, filesName: string = 'file') {
        let responses = []
        for (let file of files) {
            const response = await uploadFile(file, filesName)
            responses.push(response)
        }
        return responses
    }
}