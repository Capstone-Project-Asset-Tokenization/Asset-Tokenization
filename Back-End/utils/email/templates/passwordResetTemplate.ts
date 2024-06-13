import { EnvConfig } from "../../../config/environmentVarialbes";
import createEmailTemplate from "./genericTemplate";
const nodemailer = require("nodemailer");

export const sendResetMail = (email: String, token: String) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: EnvConfig.EMAIL_USERNAME,
      pass: EnvConfig.EMAIL_SENDER_PASSWORD,
    },
  });
  let url = `${EnvConfig.FRONTEND_BASE_URL}/reset-password/${token}`;

  let message = `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border-radius: 10px;">
    <h2 style="color: #B875FD;">Password Reset Request</h2>
    <p>You have requested a password reset for your account on Asset tokezitaion platform.</p>
    <p style="margin-top: 40px;">
      <a href="${url}" style="background-color: #B875FD; color: white; padding: 10px 40px; text-decoration: none; border-radius: 5px;">Reset Password</a>
    </p>
    <p>If you did not initiate this password reset request, you can safely ignore this email.</p>

  </div>
`;

  const mailOptions = {
    from: {
      name: "Asset Tokenization Platform",
      address: EnvConfig.EMAIL_USERNAME,
    },
    to: `${email}`,
    subject: "Password Reset Request",
    html: message,
  };

  transporter.sendMail(mailOptions, function (error: any, info: any) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
