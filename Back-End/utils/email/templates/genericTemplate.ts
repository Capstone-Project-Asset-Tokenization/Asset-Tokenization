export default (firstName: string, message: string, showLoginLink: boolean = true): string => {
    return `
    <!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="utf-8">
        <title>Token-Hub.com</title>
        <style>
            :root {
                font-family: sans-serif;
            }
    
            .container {
                width: 100%;
                height: 100%;
                padding: 20px;
                background-color: #f4f4f4;
            }
    
            .email {
                width: 80%;
                margin: 0 auto;
                background-color: #fff;
                padding: 20px;
            }
    
            .email-header {
                background-color: #011C40;
                color: #FACD9D;
                padding: 15px ;
                text-align: center;
                display: flex;
                justify-content: center;
                align-items: center;
            }
    
            .email-header img {
                height: 40px;
                margin-right: 20px;
            }
    
            .email-body {
                padding: 18px;
                color: gray;
                font-size: 18px;
                text-align: justify;
            }
    
            .email-footer {
                background-color: #011C40;
                color: #FACD9D;
                padding: 10px;
            }
    
            .social-icons a {
                margin: 0 1em;
                color: #FACD9D;
                font-size: 18px;
            }
    
            .link {
                text-decoration: none;
                color: #FACD9D;
            }
        </style>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
    </head>
    
    <body>
        <div class="container">
            <div class="email">
                <div  class="email-header" style="display: flex;justify-content: center;align-items: center;">
    
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                        <tr>
                            <td style="text-align: center;">
                            <a  target="_blank" href="https://www.token-hub.com" class="link">
                                <img alt='logo'  src="http://token-hub.com/logo.png">
                                </a>
                                <a  target="_blank" href="https://www.token-hub.com" class="link">
                                    <h1 style="text-align:center; color: #FACD9D;">Token-Hub.com</h1>
                                </a>
                            </td>
                        </tr>
                    </table>
    
                </div>
                <div class="email-body">
                    <h3>
                        Hello ${firstName},
                    </h3>
                    <p>
                        ${message}
                    </p>

                    ${showLoginLink ? `<p>
                        Login to your account <a href= 'https://token-hub.com/login'> here. </a>
                    </p>` : ''
        }
                </div>
                <div class="email-footer">
                    <a target="_blank" href="https://www.token-hub.com" class="link">
                        <h2 style="text-align:center; color: #FACD9D;">Token-Hub.com</h2>
                    </a>
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                        <tr>
                            <td align="center">
                                <div class="social-icons" style="margin-top: 10px;">
                                    <a style="text-decoration: none;" href="https://www.instagram.com/token-hubapp/?igshid=MzRlODBiNWFlZA==" target="_blank">
                                        <img style="height: 42px;" alt="instagram logo"
                                            src="https://www.token-hub.com/instagram.png" />
                                    </a>
                                    <a style="text-decoration: none;" href="http://twitter.com/token-hubapp" target="_blank">
                                        <img style="height: 40px;" alt="twitter logo"
                                            src="https://www.token-hub.com/twitter.png" />
                                    </a>
                                    <a style="text-decoration: none;" href="https://www.facebook.com/profile.php?id=100092570389153&mibextid=LQQJ4d"
                                        target="_blank">
                                        <img style="height: 41px;" alt="facebook logo"
                                            src="https://www.token-hub.com/facebook.png" />
                                    </a>
                                </div>
    
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </body>
    </html>
    `;
}