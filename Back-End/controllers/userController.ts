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
import { sendSupportMail } from "../services/supEmailService";

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
      console.log(email, password, requestVerification, "in controller");
      let token = await this.userService.login(
        email,
        password,
        requestVerification
      );
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

  requestReset = catchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      let { email } = req.body;
      let user = await this.userService.requestReset(email);
      res.status(200).json(user);
    }
  );

  resetPassword = catchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      let { newPassword, token } = req.body;
      let user = await this.userService.resetPassword(newPassword, token);
      res.status(200).json(user);
    }
  )

  updateProfile = catchAsyncError(
    async (req: CustomRequest, res: Response, next: NextFunction) => {
      let { userId, data } = req.body;
      console.log(userId,data,"the data")
      let user = await this.userService.updateProfile(userId, data);
      res.status(200).json(user);
    }
  );

  changePassword = catchAsyncError(
    async (req: CustomRequest, res: Response, next: NextFunction) => {
      let { userId, newPassword, oldPassword } = req.body;
      console.log(userId,newPassword,oldPassword,"in controller")
      let user = await this.userService.changePassword(
        userId,
        newPassword,
        oldPassword
      );
      res.status(200).json(user);
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
      if (typeof walletAddresses === "string") {
        walletAddresses = [walletAddresses];
        }
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

  support = catchAsyncError(async (req: CustomRequest, res: Response) => {
    let { email, name, description } = req.body;
    try{
      sendSupportMail(name, email, description);
    } catch (error) {
      res.status(500).json({ message: "Failed to send message" });
    }
    res.status(200).json({ message: "Message sent" });
  });
}

