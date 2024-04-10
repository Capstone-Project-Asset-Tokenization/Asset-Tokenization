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
const generateToken_1 = require("../utils/authentication/generateToken");
const customErrors_1 = require("../utils/error/customErrors");
class UserServie {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    register(user) {
        return __awaiter(this, void 0, void 0, function* () {
            let existingUser = yield this.userRepository.getUserByEmail(user.email);
            if (existingUser) {
                throw new customErrors_1.CustomError(409, 'User email already exists');
            }
            existingUser = yield this.userRepository.getUserByPhoneNumber(user.phoneNumber);
            if (existingUser) {
                throw new customErrors_1.CustomError(409, 'User phone number already exists');
            }
            return yield this.userRepository.createUser(user);
        });
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield this.userRepository.getUserByEmail(email);
            if (!user) {
                throw new customErrors_1.NotFoundError();
            }
            return user;
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield this.userRepository.getUserByEmail(email);
            if (!user) {
                throw new customErrors_1.NotFoundError();
            }
            if (!(yield user.comparePassword(password))) {
                throw new customErrors_1.CustomError(401, 'Invalid password');
            }
            return (0, generateToken_1.generateToken)({ _id: user._id, email: user.email, roles: user.roles, walletAddress: user.walletAddress });
        });
    }
    getUserByWalletAddress(walletAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield this.userRepository.getUserByWalletAddress(walletAddress);
            if (!user) {
                throw new customErrors_1.NotFoundError();
            }
            return user;
        });
    }
    updateUserWalletAddress(id, walletAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepository.updateUserWalletAddress(id, walletAddress);
        });
    }
}
exports.default = UserServie;
