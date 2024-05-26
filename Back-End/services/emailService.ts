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
    from: "Asset Tokenization Platfrom",
    to: `${email}`,
    subject: "Please verify your email...",
    html: `<p>Hello, verify your email address by clicking on this</p>
        <br>
        <a href="http://localhost:5173/verify-email?emailToken=${emailToken}">Click here to verify</a>
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

