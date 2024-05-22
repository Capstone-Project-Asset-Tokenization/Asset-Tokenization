
import User from '../models/user';
import { IUser, RegistrationInput } from '../types/user';

export default class UserRepository {
    public async createUser(user: RegistrationInput) {
        return await User.create(user);
    }

    public async getUserByEmail(email: string) {
        return await User.findOne({
            email
        });
    }

    public async getUserByWalletAddress(walletAddress: string) {
        return await User.findOne({
            walletAddress: { $regex: new RegExp(walletAddress, 'i') }
        });
    }

    public async getUsersByWalletAddresses(walletAddresses: string[]) {
        // make the search case insensitive
        const users = []
        for (let i = 0; i < walletAddresses.length; i++) {
            const user = await User.findOne({
                walletAddress: { $regex: new RegExp(walletAddresses[i], 'i') }
            });
            if (!user) {
                users.push('')
                continue
            }
            users.push(user)
        }

        return users
        // return await User.find({
        //     walletAddress: { $in: walletAddresses }
        // });
    }

    public async getUserById(id: string) {
        return await User.findById(id);
    }

    public async updateUserById(id: string, user: any) {
        return await User.findByIdAndUpdate(id, user, { new: true });
    }

    public async deleteUserById(id: string) {
        return await User.findByIdAndDelete(id);
    }

    public async updateUserWalletAddress(id: string, walletAddress: string) {
        return await User.findByIdAndUpdate(id, { walletAddress }, { new: true });
    }

    public async getUserByPhoneNumber(phoneNumber: string) {
        return await User.findOne({
            phoneNumber
        });
    }

    public async updateUserRole(userWallet: string, newRole: string) {
        return await User.findOneAndUpdate({ walletAddress: { $regex: new RegExp(userWallet, 'i') } }, { roles: [newRole] }, { new: true });
    }

    public async banUser(userWallet: string) {
        return await User.findOneAndUpdate({ walletAddress: { $regex: new RegExp(userWallet, 'i') } }, { isBanned: true }, { new: true });
    }

    public async unbanUser(userWallet: string) {
        return await User.findOneAndUpdate({ walletAddress: { $regex: new RegExp(userWallet, 'i') } }, { isBanned: false }, { new: true });
    }

}