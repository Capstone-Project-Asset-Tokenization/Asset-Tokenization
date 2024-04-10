"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = exports.authenticateUser = void 0;
const verifyToken_1 = require("../../utils/authentication/verifyToken");
const catchAsyncError_1 = require("../../utils/error/catchAsyncError");
const customErrors_1 = require("../../utils/error/customErrors");
exports.authenticateUser = (0, catchAsyncError_1.catchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (token) {
        let verified = (0, verifyToken_1.verifyToken)(token);
        req.userRoles = verified.roles;
        req.email = verified.email;
        req.walletAddress = verified.walletAddress;
        req.userID = verified._id;
        next();
    }
    else {
        throw new customErrors_1.UnauthorizedError();
    }
}));
exports.isAdmin = (0, catchAsyncError_1.catchAsyncError)((req, res, next) => {
    var _a;
    if ((_a = req.userRoles) === null || _a === void 0 ? void 0 : _a.includes('ADMIN')) {
        next();
    }
    else {
        throw new customErrors_1.UnauthorizedError();
    }
});
