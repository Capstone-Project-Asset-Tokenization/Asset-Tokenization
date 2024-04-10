"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const environmentVarialbes_1 = require("../../config/environmentVarialbes");
const customErrors_1 = require("../error/customErrors");
const verifyToken = (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, environmentVarialbes_1.EnvConfig.JWT_SECRET);
    }
    catch (error) {
        throw new customErrors_1.UnauthorizedError();
    }
};
exports.verifyToken = verifyToken;
