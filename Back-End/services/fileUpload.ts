import { response } from "express";
import { uploadFile } from "../utils/fileStorage/storage";

export class FileUploadService {
    async uploadFile(file: any, fileName: string = 'file') {
        const response = await uploadFile(file.tempFilePath, file.name)
        console.log(response, 'response')
        return response
    }

    async uploadFiles(files: any, filesName: string = 'file') {
        let responses = []
        for (let file of files) {
            const response = await uploadFile(file.tempFilePath, file.name)
            responses.push(response)
        }
        return responses
    }
}