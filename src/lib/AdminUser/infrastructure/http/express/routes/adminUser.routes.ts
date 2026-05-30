import { Router } from 'express'
import { AdminUserController } from '@/lib/AdminUser/infrastructure/http/express/controller/adminUser.controller'
import { checkAdminAuth } from '@/lib/shared/insfrastructure/http/middleware/checkAdminAuth.middleware'
import { checkId } from '@/lib/shared/insfrastructure/http/middleware/checkId.middleware'

export const adminUserRouter = Router()

const adminUserController = new AdminUserController()

adminUserRouter.get('/', checkAdminAuth, adminUserController.getAll)
adminUserRouter.get('/:id', checkId, adminUserController.findById)

adminUserRouter.post('/', checkAdminAuth, adminUserController.create)

adminUserRouter.put(
    '/token/:id',
    checkAdminAuth,
    checkId,
    adminUserController.updateNotificationToken
)
