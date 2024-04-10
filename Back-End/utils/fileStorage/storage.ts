import { v2 as cloudinary } from 'cloudinary';
import { EnvConfig } from '../../config/environmentVarialbes';
import { deleteFile } from './deleteFile';

cloudinary.config({
    cloud_name: EnvConfig.CLOUD_NAME,
    api_key: EnvConfig.CLOUDINARY_API_KEY,
    api_secret: EnvConfig.CLOUDINARY_API_SECRET
});


export const uploadFile = async (file: any, fileName: string = 'file') => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(file, { public_id: fileName }, (error: any, result: any) => {
            deleteFile(file)
            if (error) {
                reject(error);
            }
            resolve(result);
        });
    });
}