import User from "../models/user";
import { IUser, RegistrationInput } from "../types/user";

export default class UserRepository {
  public async createUser(user: RegistrationInput) {
    return await User.create(user);
  }

  public async getUserByEmail(email: string) {
    return await User.findOne({
      email,
    });
  }

  public async getUserByWalletAddress(walletAddress: string) {
    return await User.findOne({
      walletAddress: { $regex: new RegExp(walletAddress, "i") },
    });
  }

  public async getUserVerification(emailToken: string) {
    return await User.findOne({ emailToken: emailToken });
  }

  public async updateIsVerified(email: string) {
    return await User.findOneAndUpdate(
      { email: { $regex: new RegExp(email, "i") } },
      { isVerified: true },
      { new: true }
    );
  }

  public async updatePassword(userId: string, newPassword: string) {
    try {
      return await User.findOneAndUpdate(
        { _id: userId },
        { password: newPassword},
        { new: true }
      );
    } catch (error) {
      console.error("Error updating password:", error);
      throw error; // Propagate the error or handle it as needed
    }
  }

  public async getUsersByWalletAddresses(
    walletAddresses: string[]
  ): Promise<any[]> {
    console.log(walletAddresses);
    const users = await User.find({
      walletAddress: { $in: walletAddresses },
    }).exec();
    const userMap = new Map(users.map((user) => [user.walletAddress, user]));
    return walletAddresses.map((address) => userMap.get(address) || null);
  }

  public async verifyEmail(emailToken: string) {
    console.log("verifying email with token sent....", emailToken);
    let user = await User.findOne({ where: { emailToken: emailToken } });
    if (!user) {
      throw new Error("Invalid email token");
    }
  }

  public async requestReset(email: string) {
    let user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error("There is no user with this email");
    }
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
      phoneNumber,
    });
  }

  public async updateUserRole(userWallet: string, newRole: string) {
    return await User.findOneAndUpdate(
      { walletAddress: { $regex: new RegExp(userWallet, "i") } },
      { roles: [newRole] },
      { new: true }
    );
  }

  public async banUser(userWallet: string) {
    return await User.findOneAndUpdate(
      { walletAddress: { $regex: new RegExp(userWallet, "i") } },
      { isBanned: true },
      { new: true }
    );
  }

  public async unbanUser(userWallet: string) {
    return await User.findOneAndUpdate(
      { walletAddress: { $regex: new RegExp(userWallet, "i") } },
      { isBanned: false },
      { new: true }
    );
  }
}
