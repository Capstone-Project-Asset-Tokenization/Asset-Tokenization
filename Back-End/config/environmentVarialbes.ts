
export const EnvConfig ={
    PORT: process.env.PORT || 5000,
    MONGODB_URL: process.env.MONGODB_URL || 'mongodb://localhost/asset-tokenization',
    JWT_SECRET: process.env.JWT_SECRET || 'something',
    CLOUD_NAME: process.env.CLOUD_NAME || 'drjsgceky',
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || "342699666849659",
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || "QMY5rZRJ8p9zgpXGh7G4Xr8pryI",
    EMAIL_USER: process.env.EMAIL_USER || 'asset',
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD || '**********',
}