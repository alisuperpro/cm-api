import { Router } from 'express'
import { UserController } from '@/lib/User/infrastructure/http/express/controller/user.controller'
import { checkAdminAuth } from '@/lib/shared/insfrastructure/http/middleware/checkAdminAuth.middleware'
import { checkAuth } from '@/lib/shared/insfrastructure/http/middleware/checkAuth.middleware'
import { SentryErrorHandler } from '@/lib/shared/insfrastructure/monitoring/sentryHandler'

export const userRouter = Router()

const errorHandler = new SentryErrorHandler()
const userController = new UserController(errorHandler)

userRouter.get('/', checkAdminAuth, userController.getAll)
userRouter.get('/me/:id', checkAuth, userController.findById)

userRouter.post('/', userController.create)
