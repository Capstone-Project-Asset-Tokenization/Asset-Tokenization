import { CustomRequest } from '../../types/customRequest'
import { UserToken } from '../../types/userToken'
import { verifyToken } from '../../utils/authentication/verifyToken'
import { catchAsyncError } from '../../utils/error/catchAsyncError'
import { CustomError, UnauthorizedError } from '../../utils/error/customErrors'
import { Request, Response, NextFunction } from 'express'


export const authenticateUser = catchAsyncError(async (req: CustomRequest, res: Response, next: NextFunction) => {
    let token = req.headers.authorization?.split(' ')[1]

    if (token) {
        let verified: UserToken = verifyToken(token)

        req.userRoles = verified.roles
        req.email = verified.email
        req.walletAddress = verified.walletAddress
        req.userID = verified._id
        next()
    } else {
        throw new UnauthorizedError()
    }

})

export const isAdmin = catchAsyncError((req: CustomRequest, res: Response, next: NextFunction) => {
    if (req.userRoles?.includes('ADMIN')) {
        next()
    } else {
        throw new UnauthorizedError()
    }

})

