export const EnvConfig = {
  PORT: process.env.PORT || 5000,
  MONGODB_URL:
    process.env.DATABASE_URL || "mongodb://localhost/asset-tokenization",
  JWT_SECRET: process.env.JWT_SECRET || "something",
  CLOUD_NAME: process.env.CLOUD_NAME || "drjsgceky",
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || "342699666849659",
  CLOUDINARY_API_SECRET:
    process.env.CLOUDINARY_API_SECRET || "QMY5rZRJ8p9zgpXGh7G4Xr8pryI",
  EMAIL_USER: process.env.EMAIL_USER || "asset",
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD || "**********",
  ADMIN_EMAIL: process.env.ADMIN_EMAIL || "admin@email.com",
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || "12345678",
  ADMIN_WALLET:
    process.env.ADMIN_WALLET || "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
  ADMIN_NATIONAL_ID: process.env.ADMIN_NATIONAL_ID || "1234567890",
  ADMIN_FIRSTNAME: process.env.ADMIN_FIRSTNAME || "Abebe",
  ADMIN_LASTNAME: process.env.ADMIN_LASTNAME || "Kebede",
  EMAIL_USERNAME: process.env.EMAIL_USERNAME || "jebessadejene2017@gmail.com",
  EMAIL_SENDER_PASSWORD: process.env.EMAIL_USERNAME || "vlvl zcgr bqhu rrku",
  EMAIL_TOKEN: process.env.ADMIN_EMAIL_TOKEN || "assdfrrghhyhgyjnhvbkdvbwkvbksdkvbsncsdkbvdhbksvdkb",
};
