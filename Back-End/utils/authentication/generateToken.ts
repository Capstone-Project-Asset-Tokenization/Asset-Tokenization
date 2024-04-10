import jwt from 'jsonwebtoken'
import { EnvConfig } from '../../config/environmentVarialbes'
import { UserToken } from '../../types/userToken'

export const generateToken = (data: UserToken) => {
    return jwt.sign(data, EnvConfig.JWT_SECRET)
}

