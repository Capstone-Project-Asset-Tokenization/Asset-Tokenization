"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PASSWORD_RESET_HTML_TEMPLATE = void 0;
const genericTemplate_1 = __importDefault(require("./genericTemplate"));
const PASSWORD_RESET_HTML_TEMPLATE = (firstName, token) => {
    let url = `https://www.token-hub.com/reset-password/${token}`;
    let message = `You have requested a password reset for your account on token-hub. 
    <p>Click <a href='${url}' >here</a> to reset your password </p>
    <p>If you didn't make password reset request, please notify us immediately at token-hub@gmail.com</p>
    `;
    return (0, genericTemplate_1.default)(firstName, message, false);
};
exports.PASSWORD_RESET_HTML_TEMPLATE = PASSWORD_RESET_HTML_TEMPLATE;
