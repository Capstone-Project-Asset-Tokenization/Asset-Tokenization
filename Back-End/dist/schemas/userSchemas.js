"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseWalletUpdateRequest = exports.parseLoginRequest = exports.parseRegistrationRequest = void 0;
const zod_1 = require("zod");
const userRegistrationSchema = zod_1.z.object({
    firstName: zod_1.z
        .string()
        .min(2)
        .max(1000),
    lastName: zod_1.z
        .string()
        .min(2)
        .max(1000),
    password: zod_1.z
        .string()
        .min(8)
        .refine((value) => value.length >= 8, {
        message: 'Password must be at least 8 characters long',
    }),
    email: zod_1.z.string().email(),
    phoneNumber: zod_1.z.string().min(10),
    nationalID: zod_1.z.string().min(6)
});
const parseRegistrationRequest = (record) => userRegistrationSchema.parse(record);
exports.parseRegistrationRequest = parseRegistrationRequest;
const userLoginSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8),
});
const parseLoginRequest = (record) => userLoginSchema.parse(record);
exports.parseLoginRequest = parseLoginRequest;
const walletUpdateSchema = zod_1.z.object({
    walletAddress: zod_1.z.string().min(10),
});
const parseWalletUpdateRequest = (record) => walletUpdateSchema.parse(record);
exports.parseWalletUpdateRequest = parseWalletUpdateRequest;
