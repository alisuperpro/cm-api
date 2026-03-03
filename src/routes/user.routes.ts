import { Router } from 'express'
import { UserController } from '../controller/user.controller'
import { checkAuth } from '../middleware/checkAuth.middleware'
import { checkAdminAuth } from '../middleware/checkAdminAuth.middleware'
import { checkId } from '../middleware/checkId.middleware'

export const userRouter = Router()

userRouter.get('/', checkAdminAuth, UserController.all)
userRouter.get('/me/:id', checkAuth, checkId, UserController.me)

userRouter.post('/', UserController.create)
