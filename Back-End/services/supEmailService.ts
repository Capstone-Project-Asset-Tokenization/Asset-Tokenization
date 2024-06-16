import { EnvConfig } from "../config/environmentVarialbes";
const nodemailer = require("nodemailer");

export const sendSupportMail = (name: string, email: string, description: string) => {
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

  // Email to the user
  const userMailOptions = {
    from: {
      name: "Asset Tokenization Platform Support",
      address: EnvConfig.EMAIL_USERNAME,
    },
    to: `${email}`,
    subject: "Support Request Received",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #A259FF;">Asset Tokenization Platform</h2>
        <p>Hello ${name},</p>
        <p>Thank you for reaching out to us. We have received your support request with the following details:</p>
        <p><strong>Description:</strong></p>
        <p>${description}</p>
        <p>Our support team will get back to you as soon as possible.</p>
        <br>
        <p>Best regards,</p>
        <p><strong>Asset Tokenization Platform Support Team</strong></p>
        <hr style="border: none; border-top: 1px solid #eee;">
        <p style="font-size: 12px; color: #777;">
          If you have any further questions, feel free to contact us at <a href="mailto:support@assettokenization.com">support@assettokenization.com</a>.
        </p>
      </div>
    `,
  };

  // Email to the support team
  const supportMailOptions = {
    from: {
      name: "Asset Tokenization Platform Support",
      address: EnvConfig.EMAIL_USERNAME,
    },
    to: 'gemechisurgessa12@gmail.com',
    subject: "New Support Request",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #A259FF;">Asset Tokenization Platform</h2>
        <p>Hello Support Team,</p>
        <p>A new support request has been received with the following details:</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Description:</strong></p>
        <p>${description}</p>
        <br>
        <p>Best regards,</p>
        <p><strong>Asset Tokenization Platform System</strong></p>
      </div>
    `,
  };

  // Send email to the user
  transporter.sendMail(userMailOptions, function (error: any, info: any) {
    if (error) {
      throw new Error("Error sending email to user");
    } else {
      console.log("Email sent to user: " + info.response);
    }
  });

  // Send email to the support team
  transporter.sendMail(supportMailOptions, function (error: any, info: any) {
    if (error) {
      throw new Error("Error sending email to support team");
    } else {
      console.log("Email sent to support team: " + info.response);
    }
  });
};
