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
const catchAsyncError_1 = require("../utils/error/catchAsyncError");
const userSchemas_1 = require("../schemas/userSchemas");
class UserController {
    constructor(userService) {
        this.userService = userService;
        this.register = (0, catchAsyncError_1.catchAsyncError)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let userData = (0, userSchemas_1.parseRegistrationRequest)(req.body);
            let user = yield this.userService.register(req.body);
            res.status(201).json(user);
        }));
        this.login = (0, catchAsyncError_1.catchAsyncError)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let { email, password } = (0, userSchemas_1.parseLoginRequest)(req.body);
            let token = yield this.userService.login(email, password);
            res.status(200).json({ token });
        }));
        this.getUser = (0, catchAsyncError_1.catchAsyncError)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let user = yield this.userService.getUserByEmail(req.email);
            res.status(200).json(user);
        }));
        this.getUserByWalletAddress = (0, catchAsyncError_1.catchAsyncError)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let user = yield this.userService.getUserByWalletAddress(req.params.walletAddress);
            res.status(200).json(user);
        }));
        this.updateUserWalletAddress = (0, catchAsyncError_1.catchAsyncError)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let { walletAddress } = (0, userSchemas_1.parseWalletUpdateRequest)(req.body);
            let user = yield this.userService.updateUserWalletAddress(req.userID, walletAddress);
            res.status(200).json(user);
        }));
    }
}
exports.default = UserController;
