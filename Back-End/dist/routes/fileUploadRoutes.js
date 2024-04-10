"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fileUploadController_1 = __importDefault(require("../controllers/fileUploadController"));
const fileUpload_1 = require("../services/fileUpload");
const fileUploadRouter = express_1.default.Router();
const fileUploadService = new fileUpload_1.FileUploadService();
const fileUploadController = new fileUploadController_1.default(fileUploadService);
fileUploadRouter.post('/single', fileUploadController.uploadFile);
fileUploadRouter.post('/multiple', fileUploadController.uploadFiles);
exports.default = fileUploadRouter;
