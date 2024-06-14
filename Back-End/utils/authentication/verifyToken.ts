import jwt from "jsonwebtoken";
import { EnvConfig } from "../../config/environmentVarialbes";
import { UserToken } from "../../types/userToken";
import { UnauthorizedError } from "../error/customErrors";

export const verifyToken = (token: string): UserToken => {
  try {
      return jwt.verify(token, EnvConfig.JWT_SECRET) as UserToken
  } catch (error) {
      throw new UnauthorizedError()
  }
}

