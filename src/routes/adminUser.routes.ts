import { Router } from 'express'
import { AdminUserController } from '../controller/adminUser.controller'
import { checkAdminAuth } from '../middleware/checkAdminAuth.middleware'

export const adminUserRouter = Router()

adminUserRouter.get('/', checkAdminAuth, AdminUserController.all)
adminUserRouter.get('/:id', checkAdminAuth, AdminUserController.byId)

adminUserRouter.post('/', checkAdminAuth, AdminUserController.create)

adminUserRouter.put(
    '/:id',
    checkAdminAuth,
    AdminUserController.updateNotificatonToken
)
