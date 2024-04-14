import { FileUploadService } from "../services/fileUpload";
import { catchAsyncError } from "../utils/error/catchAsyncError";

export default class FileUploadController {
  constructor(private fileUploadService: FileUploadService) {}

  uploadFile = catchAsyncError(async (req: any, res: any, next: any) => {
    console.log(req.files.AssetImage, "req.files-----single");
    let AssetFile = req.files.AssetImage;
    const response = (await this.fileUploadService.uploadFile(
      AssetFile
    )) as any;
    console.log(response, "response");

    // if (OwnerShipFile) {
    //     if (OwnerShipFile.length > 1) {
    //         for (let i = 0; i < OwnerShipFile.length; i++) {
    //             response.push(await this.fileUploadService.uploadFile(OwnerShipFile[i]))
    //         }
    //     } else {
    //         response.push(await this.fileUploadService.uploadFile(OwnerShipFile))
    //     }
    // }

    res.status(200).json(response);
  });

  uploadFiles = catchAsyncError(async (req: any, res: any, next: any) => {
    console.log(req.files, "req.files-----multiple");
    let AssetFiles = req.files.AssetImages;
    let response = await this.fileUploadService.uploadFiles(AssetFiles);
    res.status(200).json(response);
  });
}
