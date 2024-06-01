import User from "../models/user";
import { EnvConfig } from "./environmentVarialbes"; // Assuming ADMIN_EMAIL and ADMIN_PASSWORD are exported from config.ts

const seed = async () => {
  try {
    const admin = await User.findOne({ roles: ["ADMIN"] });

    if (!admin) {
      const newAdmin = new User({
        firstName: EnvConfig.ADMIN_FIRSTNAME,
        lastName: EnvConfig.ADMIN_LASTNAME,
        email: EnvConfig.ADMIN_EMAIL,
        password: EnvConfig.ADMIN_PASSWORD,
        walletAddress: EnvConfig.ADMIN_WALLET,
        nationalID: EnvConfig.ADMIN_NATIONAL_ID,
        emailToken: EnvConfig.EMAIL_TOKEN,
        roles: ["ADMIN"],
        isBanned: false,
      });

      await newAdmin.save();
      console.log("Admin user created.");
    } else {
      console.log("Admin user already exists.");
    }
  } catch (error: any) {
    console.log(error, "Try again!");
  }
};

export default seed;
