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
exports.FileUploadService = void 0;
const storage_1 = require("../utils/fileStorage/storage");
class FileUploadService {
    uploadFile(file_1) {
        return __awaiter(this, arguments, void 0, function* (file, fileName = 'file') {
            const response = yield (0, storage_1.uploadFile)(file.tempFilePath, fileName);
            return response;
        });
    }
    uploadFiles(files_1) {
        return __awaiter(this, arguments, void 0, function* (files, filesName = 'file') {
            let responses = [];
            for (let file of files) {
                const response = yield (0, storage_1.uploadFile)(file, filesName);
                responses.push(response);
            }
            return responses;
        });
    }
}
exports.FileUploadService = FileUploadService;
