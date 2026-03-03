import { Router } from 'express'
import { AdminUserController } from '../controller/adminUser.controller'
import { checkAdminAuth } from '../middleware/checkAdminAuth.middleware'
import { checkId } from '../middleware/checkId.middleware'

export const adminUserRouter = Router()

adminUserRouter.get('/', checkAdminAuth, AdminUserController.all)
adminUserRouter.get('/:id', checkAdminAuth, checkId, AdminUserController.byId)

adminUserRouter.post('/', checkAdminAuth, AdminUserController.create)

adminUserRouter.put(
    '/token/:id',
    checkAdminAuth,
    checkId,
    AdminUserController.updateNotificatonToken
)
