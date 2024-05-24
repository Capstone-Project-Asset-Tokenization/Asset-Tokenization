import express from 'express';
import UserServie from '../services/userServices';
import { authenticateUser, isAdmin } from '../middlewares/auth/auth';
import UserRepository from '../repositories/userRepository';
import UserController from '../controllers/userController';

const userRouter = express.Router()
const userRepository = new UserRepository()
const userService = new UserServie(userRepository)
const userController = new UserController(userService)

userRouter.post('/register', userController.register)
userRouter.post('/login', userController.login)
userRouter.patch('/verifyemail', userController.verifyEmail)
userRouter.get('/', authenticateUser, userController.getUser)
userRouter.get('/wallet/:walletAddress', authenticateUser, userController.getUserByWalletAddress)
userRouter.get('/wallets', authenticateUser, userController.getUsersByWalletAddresses)
userRouter.put('/wallet', authenticateUser, userController.updateUserWalletAddress)
userRouter.put('/update-role', authenticateUser, isAdmin, userController.updateUserRole)
userRouter.put('/ban/:walletAddress', authenticateUser, isAdmin, userController.banUser)
userRouter.put('/unban/:walletAddress', authenticateUser, isAdmin, userController.unbanUser)

export default userRouter