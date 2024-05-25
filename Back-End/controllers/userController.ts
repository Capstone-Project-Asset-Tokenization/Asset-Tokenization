import { Request, Response, NextFunction } from "express";
import UserServie from "../services/userServices";
import { catchAsyncError } from "../utils/error/catchAsyncError";
import {
  parseLoginRequest,
  parseRegistrationRequest,
  parseUpdateRoleRequest,
  parseWalletUpdateRequest,
} from "../schemas/userSchemas";
import { RegistrationInput } from "../types/user";
import { CustomRequest } from "../types/customRequest";
import { sendMail } from "../services/emailService";
import crypto from "crypto";

export default class UserController {
  constructor(private userService: UserServie) {}

  register = catchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      let userData: RegistrationInput = parseRegistrationRequest(req.body);
      const emailToken = crypto.randomBytes(64).toString("hex");
      let user = await this.userService.register({ ...req.body, emailToken });

      sendMail(req.body.email, emailToken);
      res.status(201).json(user);
    }
  );

  login = catchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      let { email, password, requestVerification } = req.body;
      let token = await this.userService.login(email, password, requestVerification);
      let user = await this.userService.getUserByEmail(email);
      res.status(200).json({ token, user });
    }
  );

  verifyEmail = catchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      let { emailToken } = req.body;
      console.log("verifying email....", emailToken);
      let email = await this.userService.verifyEmail(emailToken);
      res.status(200).json(email);
    }
  );

  getUser = catchAsyncError(
    async (req: CustomRequest, res: Response, next: NextFunction) => {
      let user = await this.userService.getUserByEmail(req.email!);
      res.status(200).json(user);
    }
  );

  getUserByWalletAddress = catchAsyncError(
    async (req: CustomRequest, res: Response, next: NextFunction) => {
      let user = await this.userService.getUserByWalletAddress(
        req.params.walletAddress!
      );
      res.status(200).json(user);
    }
  );

  getUsersByWalletAddresses = catchAsyncError(
    async (req: CustomRequest, res: Response, next: NextFunction) => {
      let walletAddresses = req.query.walletAddresses as string[];
      let users = await this.userService.getUsersByWalletAddresses(
        walletAddresses
      );
      res.status(200).json(users);
    }
  );

  updateUserWalletAddress = catchAsyncError(
    async (req: CustomRequest, res: Response, next: NextFunction) => {
      let { walletAddress } = parseWalletUpdateRequest(req.body);
      let user = await this.userService.updateUserWalletAddress(
        req.userID!,
        walletAddress
      );
      res.status(200).json(user);
    }
  );

  updateUserRole = catchAsyncError(
    async (req: CustomRequest, res: Response) => {
      let { newRole, walletAddress } = parseUpdateRoleRequest(req.body);
      let user = await this.userService.updateUserRole(walletAddress, newRole);
      res.status(200).json(user);
    }
  );

  banUser = catchAsyncError(async (req: CustomRequest, res: Response) => {
    let user = await this.userService.banUser(req.params.walletAddress);
    res.status(200).json(user);
  });

  unbanUser = catchAsyncError(async (req: CustomRequest, res: Response) => {
    let user = await this.userService.unbanUser(req.params.walletAddress);
    res.status(200).json(user);
  });
}
