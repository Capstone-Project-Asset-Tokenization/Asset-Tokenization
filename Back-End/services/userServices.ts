import UserRepository from "../repositories/userRepository";
import { RegistrationInput } from "../types/user";
import { generateToken } from "../utils/authentication/generateToken";
import { verifyToken } from "../utils/authentication/verifyToken";
import {
  CustomError,
  InternalServerError,
  NotFoundError,
} from "../utils/error/customErrors";

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

  async getUserByEmail(email: string) {
    let user = await this.userRepository.getUserByEmail(email);
    if (!user) {
      throw new NotFoundError("There is no user with this email");
    }
    return user;
  }
  async login(email: string, password: string) {
    let user = await this.userRepository.getUserByEmail(email);
    if (!user) {
      throw new NotFoundError("There is no user with this email");
    }

    if (!(await user.comparePassword(password))) {
      throw new CustomError(401, "Wrong password");
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
