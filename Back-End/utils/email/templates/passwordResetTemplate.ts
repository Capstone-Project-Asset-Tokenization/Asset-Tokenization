import createEmailTemplate from './genericTemplate'

export const PASSWORD_RESET_HTML_TEMPLATE = (firstName:string, token:string):string => {

    let url = `https://www.token-hub.com/reset-password/${token}`


    let message = `You have requested a password reset for your account on token-hub. 
    <p>Click <a href='${url}' >here</a> to reset your password </p>
    <p>If you didn't make password reset request, please notify us immediately at token-hub@gmail.com</p>
    `
    return createEmailTemplate(firstName, message,false)
}

