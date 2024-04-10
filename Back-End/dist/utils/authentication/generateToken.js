"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const environmentVarialbes_1 = require("../../config/environmentVarialbes");
const generateToken = (data) => {
    return jsonwebtoken_1.default.sign(data, environmentVarialbes_1.EnvConfig.JWT_SECRET);
};
exports.generateToken = generateToken;
