import { Router } from 'express'
import { UserController } from '../controller/user.controller'
import { checkAdminAuth } from '../../../../../shared/insfrastructure/http/middleware/checkAdminAuth.middleware'
import { checkAuth } from '../../../../../shared/insfrastructure/http/middleware/checkAuth.middleware'
import { checkId } from '../../../../../shared/insfrastructure/http/middleware/checkId.middleware'

export const userRouter = Router()

const userController = new UserController()

userRouter.get('/', checkAdminAuth, userController.getAll)
userRouter.get('/me/:id', checkAuth, checkId, userController.findById)

userRouter.post('/', userController.create)
