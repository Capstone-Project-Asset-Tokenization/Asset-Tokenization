"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const catchAsyncError_1 = require("../utils/error/catchAsyncError");
class FileUploadController {
    constructor(fileUploadService) {
        this.fileUploadService = fileUploadService;
        this.uploadFile = (0, catchAsyncError_1.catchAsyncError)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let AssetFile = req.files.AssetImage;
            let response = yield this.fileUploadService.uploadFile(AssetFile);
            res.status(200).json(response);
        }));
        this.uploadFiles = (0, catchAsyncError_1.catchAsyncError)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let AssetFiles = req.files.AssetImages;
            let response = yield this.fileUploadService.uploadFiles(AssetFiles);
            res.status(200).json(response);
        }));
    }
}
exports.default = FileUploadController;
