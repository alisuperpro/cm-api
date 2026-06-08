import { Router } from 'express'
import { EmployeeController } from '@/lib/AdminUser/infrastructure/http/express/controller/adminUser.controller'
import { checkAdminAuth } from '@/lib/shared/insfrastructure/http/middleware/checkAdminAuth.middleware'
import { checkId } from '@/lib/shared/insfrastructure/http/middleware/checkId.middleware'

export const employeeRouter = Router()

const employeeController = new EmployeeController()

employeeRouter.get('/', checkAdminAuth, employeeController.getAll)
employeeRouter.get('/:id', checkId, employeeController.findById)

employeeRouter.post('/', checkAdminAuth, employeeController.create)

employeeRouter.put(
    '/token/:id',
    checkAdminAuth,
    checkId,
    employeeController.updateNotificationToken
)
