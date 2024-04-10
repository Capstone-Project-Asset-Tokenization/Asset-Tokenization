import { z } from 'zod';

const userRegistrationSchema = z.object({
    firstName: z
        .string()
        .min(2)
        .max(1000),

    lastName: z
        .string()
        .min(2)
        .max(1000),
    password: z
        .string()
        .min(8)
        .refine(
            (value) =>
                value.length >= 8,
            {
                message:
                    'Password must be at least 8 characters long',
            }
        ),
    email: z.string().email(),
    phoneNumber: z.string().min(10).optional(),
    nationalID: z.string().min(6),
    walletAddress: z.string().min(10).optional(),
});


export const parseRegistrationRequest = (record: unknown) =>
    userRegistrationSchema.parse(record);


const userLoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});

export const parseLoginRequest = (record: unknown) =>
    userLoginSchema.parse(record);

const walletUpdateSchema = z.object({
    walletAddress: z.string().min(10),
});

export const parseWalletUpdateRequest = (record: unknown) =>
    walletUpdateSchema.parse(record);