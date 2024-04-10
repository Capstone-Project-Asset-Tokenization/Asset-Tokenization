"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvConfig = void 0;
exports.EnvConfig = {
    PORT: process.env.PORT || 5000,
    MONGODB_URL: process.env.MONGODB_URL || 'mongodb://localhost/asset-tokenization',
    JWT_SECRET: process.env.JWT_SECRET || 'something',
    CLOUD_NAME: process.env.CLOUD_NAME || 'drjsgceky',
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || '828644661493838',
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || '***************************',
};
