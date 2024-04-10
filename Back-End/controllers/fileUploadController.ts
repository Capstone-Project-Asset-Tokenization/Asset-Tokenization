import { FileUploadService } from "../services/fileUpload";
import { catchAsyncError } from "../utils/error/catchAsyncError";

export default class FileUploadController {
    constructor(private fileUploadService: FileUploadService) { }

    uploadFile = catchAsyncError(async (req: any, res: any, next: any) => {
        let AssetFile = req.files.AssetImage
        let OwnerShipFile = req.files.OwnerShipImage
        let response = []

        if (AssetFile) {
            if (AssetFile.length > 1) {
                for (let i = 0; i < AssetFile.length; i++) {
                    response.push(await this.fileUploadService.uploadFile(AssetFile[i]))
                }
            } else {
                response.push(await this.fileUploadService.uploadFile(AssetFile))
            }
        }

        if (OwnerShipFile) {
            if (OwnerShipFile.length > 1) {
                for (let i = 0; i < OwnerShipFile.length; i++) {
                    response.push(await this.fileUploadService.uploadFile(OwnerShipFile[i]))
                }
            } else {
                response.push(await this.fileUploadService.uploadFile(OwnerShipFile))
            }
        }

        res.status(200).json(response)
    })

    uploadFiles = catchAsyncError(async (req: any, res: any, next: any) => {
        let AssetFiles = req.files.AssetImages
        let response = await this.fileUploadService.uploadFiles(AssetFiles)
        res.status(200).json(response)
    })
}