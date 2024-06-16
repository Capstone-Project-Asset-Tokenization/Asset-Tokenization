import UserRepository from '../../repositories/userRepository'
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
        let userRepository = new UserRepository()
        let existingUser = await userRepository.getUserById(verified._id)

        if (!existingUser) {
            throw new CustomError(404, 'User not found')
        }
    
        req.userRoles = existingUser.roles
        req.email = existingUser.email
        req.walletAddress = existingUser.walletAddress
        req.userID = existingUser._id as string
        next()
    } else {
        throw new UnauthorizedError()
    }

})

export const isAdmin = catchAsyncError(async (req: CustomRequest, res: Response, next: NextFunction) => {

    if (req.userRoles?.includes('ADMIN')) {
        next()
    } else {
        throw new UnauthorizedError()
    }

})

