import { Router } from 'express'
import { AdminUserController } from '../controller/adminUser.controller'
import { checkAdminAuth } from '../../../../../shared/insfrastructure/http/middleware/checkAdminAuth.middleware'
import { checkId } from '../../../../../shared/insfrastructure/http/middleware/checkId.middleware'

export const adminUserRouter = Router()

const adminUserController = new AdminUserController()

adminUserRouter.get('/', checkAdminAuth, adminUserController.getAll)
adminUserRouter.get(
    '/:id',
    checkAdminAuth,
    checkId,
    adminUserController.findById
)

adminUserRouter.post('/', checkAdminAuth, adminUserController.create)

adminUserRouter.put(
    '/token/:id',
    checkAdminAuth,
    checkId,
    adminUserController.updateNotificationToken
)
