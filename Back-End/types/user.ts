export interface IUser {
    firstName: string;
    lastName: string;
    phoneNumber?: string;
    nationalID: string;
    email: string;
    walletAddress?: string;
    roles: string[];
    password: string;
}

export interface RegistrationInput {
    firstName: string;
    lastName: string;
    phoneNumber?: string;
    nationalID: string;
    email: string;
    password: string;
    walletAddress?: string;
}