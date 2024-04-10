"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const customErrors_1 = require("../../utils/error/customErrors");
const errorHandler = (error, req, res, next) => {
    if (error instanceof (customErrors_1.CustomError)) {
        res.status(error.statusCode).json({ msg: error.message });
    }
    else {
        res.status(500).json({ msg: error.message });
    }
};
exports.errorHandler = errorHandler;
