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
        const timestamp = Math.round(Date.now() / 1000);  // Current timestamp
        console.log('Cloudinary Config:', cloudinary.config());

        const fileExtension = fileName.split('.').pop();
        const isImage = ['jpg', 'jpeg', 'png', 'gif', 'bmp'].includes(fileExtension ?? "");
        const resourceType: 'image' | 'raw' = isImage ? 'image' : 'raw';  // 'raw' for .ras or other non-image files

        // Prepare options including all parameters affecting the API call
        const options = {
            public_id: fileName,
            timestamp: timestamp,
            resource_type: resourceType,  // Set resource type dynamically
        };

        // Generate the signature using the Cloudinary utility
        const signature = cloudinary.utils.api_sign_request(options, EnvConfig.CLOUDINARY_API_SECRET);

        // Log the signature and the string to sign for debugging
        console.log('Generated signature:', signature);
        console.log('String to sign:', `public_id=${fileName}&timestamp=${timestamp}`);

        // Add the signature to the options to ensure Cloudinary can verify it
        cloudinary.uploader.upload(file, options, (error: any, result: any) => {
            deleteFile(file)
            if (error) {
                console.log(error, 'error uploading')
                reject(error);
            }
            console.log(result, 'result uploaded')
            resolve(result);
        });
    });
}