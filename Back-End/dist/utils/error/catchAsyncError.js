"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchAsyncError = void 0;
const catchAsyncError = (cb) => {
    return (req, res, next) => {
        Promise.resolve(cb(req, res, next)).catch(error => {
            next(error);
        });
    };
};
exports.catchAsyncError = catchAsyncError;
