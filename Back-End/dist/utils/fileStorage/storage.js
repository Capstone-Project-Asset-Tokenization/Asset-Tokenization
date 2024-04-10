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
exports.uploadFile = void 0;
const cloudinary_1 = require("cloudinary");
const environmentVarialbes_1 = require("../../config/environmentVarialbes");
cloudinary_1.v2.config({
    cloud_name: environmentVarialbes_1.EnvConfig.CLOUD_NAME,
    api_key: environmentVarialbes_1.EnvConfig.CLOUDINARY_API_KEY,
    api_secret: environmentVarialbes_1.EnvConfig.CLOUDINARY_API_SECRET
});
const uploadFile = (file_1, ...args_1) => __awaiter(void 0, [file_1, ...args_1], void 0, function* (file, fileName = 'file') {
    return new Promise((resolve, reject) => {
        cloudinary_1.v2.uploader.upload(file, { public_id: fileName }, (error, result) => {
            if (error) {
                reject(error);
            }
            resolve(result);
        });
    });
});
exports.uploadFile = uploadFile;
