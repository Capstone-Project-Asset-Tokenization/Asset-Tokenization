import UserRepository from "../repositories/userRepository";
import { RegistrationInput } from "../types/user";
import { generateToken } from "../utils/authentication/generateToken";
import { verifyToken } from "../utils/authentication/verifyToken";
import { sendResetMail } from "../utils/email/templates/passwordResetTemplate";
import {
  CustomError,
  InternalServerError,
  NotFoundError,
} from "../utils/error/customErrors";
import { sendMail } from "./emailService";

export default class UserServie {
  private userRepository: UserRepository;
  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async register(user: RegistrationInput) {
    let existingUser = await this.userRepository.getUserByEmail(user.email);

    if (existingUser) {
      throw new CustomError(409, "User email already exists");
    }

    if (user.phoneNumber)
      existingUser = await this.userRepository.getUserByPhoneNumber(
        user.phoneNumber
      );

    if (existingUser) {
      throw new CustomError(409, "User phone number already exists");
    }

    if (user.walletAddress)
      existingUser = await this.userRepository.getUserByWalletAddress(
        user.walletAddress
      );

    if (existingUser) {
      throw new CustomError(
        409,
        "User with this wallet address already exists"
      );
    }

    return await this.userRepository.createUser(user);
  }

  async verifyEmail(emailToken: string) {
    let user = await this.userRepository.getUserVerification(emailToken);
    if (!user) {
      throw new NotFoundError("Invalid email token");
    }

    return await this.userRepository.updateIsVerified(user.email);
  }

  async requestReset(email: string) {
    let user = await this.userRepository.getUserByEmail(email);
    if (!user) {
      throw new NotFoundError("There is no user with this email");
    }

    const token = generateToken({ ...user });
    sendResetMail(email, token);
    return token;
  }

  async resetPassword(newPassword: string, token: string) {
    let user: any = verifyToken(token);

    if (!user) {
      throw new CustomError(401, "Invalid token");
    }

    console.log(user?._doc)
    return await this.userRepository.updatePassword(user?._doc._id, newPassword);
  }

  async updateProfile(userId: string, data: any) {
    return await this.userRepository.updateUserById(userId, data);
  }


  async changePassword(userId: string, newPassword: string, oldPassword: string) {
    let user = await this.userRepository.getUserById(userId);

    if(!user){
      throw new NotFoundError("User not found");
    }

    if (!(await user.comparePassword(oldPassword))) {
      throw new CustomError(401, "Wrong password");
    }

    return await this.userRepository.updatePassword(userId, newPassword);
  }


  async getUserByEmail(email: string) {
    let user = await this.userRepository.getUserByEmail(email);
    if (!user) {
      throw new NotFoundError("There is no user with this email");
    }
    return user;
  }
  async login(email: string, password: string, requestVerification: boolean) {
    let user = await this.userRepository.getUserByEmail(email);

    if (!user) {
      throw new NotFoundError("There is no user with this email");
    }

    if (!(await user.comparePassword(password))) {
      throw new CustomError(401, "Wrong password");
    }

    if (!user.isVerified) {
      console.log(requestVerification, "requested?", user);
      if (requestVerification) {
        sendMail(email, user.emailToken);
      }

      throw new CustomError(
        401,
        "Email is not verified. Please check your email"
      );
    }

    return generateToken({
      _id: user._id,
      email: user.email,
      roles: user.roles,
      walletAddress: user.walletAddress,
    });
  }

  async getUserByWalletAddress(walletAddress: string) {
    let user = await this.userRepository.getUserByWalletAddress(walletAddress);
    if (!user) {
      throw new NotFoundError();
    }
    return user;
  }

  async getUsersByWalletAddresses(walletAddresses: string[]) {
    let users = await this.userRepository.getUsersByWalletAddresses(
      walletAddresses
    );
    return users;
  }

  async updateUserWalletAddress(id: string, walletAddress: string) {
    const existingUser = await this.userRepository.getUserByWalletAddress(
      walletAddress
    );
    if (existingUser) {
      throw new CustomError(409, "User wallet address already exists");
    }
    return await this.userRepository.updateUserWalletAddress(id, walletAddress);
  }

  async updateUserRole(userWallet: string, newRole: string) {
    let existingUser = await this.userRepository.getUserByWalletAddress(
      userWallet
    );
    if (!existingUser) {
      throw new NotFoundError("There is no user with this wallet");
    }

    return await this.userRepository.updateUserRole(userWallet, newRole);
  }

  async banUser(userWallet: string) {
    let existingUser = await this.userRepository.getUserByWalletAddress(
      userWallet
    );
    if (!existingUser) {
      throw new NotFoundError("There is no user with this wallet");
    }

    return await this.userRepository.banUser(userWallet);
  }

  async unbanUser(userWallet: string) {
    let existingUser = await this.userRepository.getUserByWalletAddress(
      userWallet
    );
    if (!existingUser) {
      throw new NotFoundError("There is no user with this wallet");
    }

    return await this.userRepository.unbanUser(userWallet);
  }
}
