import { Request } from 'express';
export interface CustomRequest extends Request {
    userRoles?: string[];
    email?: string;
    walletAddress?: string;
    userID?: string;
}
