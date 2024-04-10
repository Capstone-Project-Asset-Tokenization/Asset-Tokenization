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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// User.ts
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const userSchema = new mongoose_1.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    nationalID: { type: String, required: true },
    email: { type: String, required: true },
    walletAddress: { type: String, unique: true },
    roles: [{ type: [String], enum: ['ADMIN', 'USER', 'APPROVER'], default: ['USER'] }],
    password: { type: String }
});
// add password hash method
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (this.isModified('password')) {
            this.password = yield bcrypt_1.default.hash(this.password, 10);
        }
        next();
    });
});
// add password compare method
userSchema.methods.comparePassword = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(password, this.password);
    });
};
const User = (0, mongoose_1.model)('User', userSchema);
// let user = new User({
//     firstName: 'John',
//     lastName: 'Doe',
//     phoneNumber: '08012345678',
//     nationalId: '123456',
//     email: 'afdsfdf',
//     walletAddress: 'afdsfdf',
//     roles: ['USER'],
//     password: 'password'
// });
// // user.comparePassword('password');
exports.default = User;
