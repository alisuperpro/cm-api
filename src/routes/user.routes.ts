import { Router } from 'express'
import { UserController } from '../controller/user.controller'
import { checkAuth } from '../checkAuth.middleware'

export const userRouter = Router()

userRouter.get('/me', UserController.me)

userRouter.post('/', UserController.create)
userRouter.put('/', checkAuth, UserController.updateInfo)
