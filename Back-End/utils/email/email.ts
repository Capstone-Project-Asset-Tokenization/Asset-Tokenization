import nodemailer from 'nodemailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { EnvConfig } from '../../config/environmentVarialbes';

const transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo> = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: EnvConfig.EMAIL_USER,
        pass: EnvConfig.EMAIL_PASSWORD
    },
});




export const sendMail = async (mailDetails: Object, callback: Function) => {
    
    try {
        console.log('Sending Email Sent Successfully')
        const response = await transporter.sendMail(mailDetails)
        console.log('Email Sent Successfully')
        callback(response);
    } catch (error) {
        console.log('Email not sent. Error: ', error);
    }
};


// sample template 

// sendMail({
//     from: " Astenge  <astegne@gmail.com>",
//     to: newUser.email,
//     subject: "Welcome to Astenge",
//     text: "sample text",
//     html: emailTemplate(newUser.firstName),
// }, (res) => { })