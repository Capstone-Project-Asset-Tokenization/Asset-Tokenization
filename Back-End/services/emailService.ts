import { EnvConfig } from "../config/environmentVarialbes";

const nodemailer = require("nodemailer");

export const sendMail = (email: String, emailToken: String) => {
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

  const mailOptions = {
    from: {
      name: "Asset Tokenization Platform",
      address: EnvConfig.EMAIL_USERNAME,
    },
    to: `${email}`,
    subject: "Verify Your Email Address",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #A259FF;">Asset Tokenization Platform</h2>
        <p>Hello,</p>
        <p>Thank you for registering with us. To complete your registration, please verify your email address by clicking the button below:</p>
        <p style="text-align: center;">
          <a href="http://localhost:5173/verify-email?emailToken=${emailToken}" 
             style="display: inline-block; padding: 10px 60px; font-size: 16px; color: #fff; background-color: #A259FF; text-decoration: none; border-radius: 5px;">
            Verify Email
          </a>
        </p>
        <p>If you did not sign up for an account, please disregard this email.</p>
        <br>
        <p>Best regards,</p>
        <p><strong>Asset Tokenization Platform Team</strong></p>
        <hr style="border: none; border-top: 1px solid #eee;">
        <p style="font-size: 12px; color: #777;">
          If you have any questions, feel free to contact our support team at <a href="mailto:support@assettokenization.com">support@assettokenization.com</a>.
        </p>
      </div>
    `,
  };

  transporter.sendMail(mailOptions, function (error: any, info: any) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
