import { Router } from 'express'
import { EmployeeContactController } from '../controller/employeeContact.controller'
import { checkAdminAuth } from '@/lib/shared/insfrastructure/http/middleware/checkAdminAuth.middleware'
import { checkId } from '@/lib/shared/insfrastructure/http/middleware/checkId.middleware'

export const employeeContactRouter = Router()

const employeeContactController = new EmployeeContactController()

employeeContactRouter.post(
    '/',
    checkAdminAuth,
    employeeContactController.create
)

employeeContactRouter.get(
    '/employee/:id',
    checkId,
    employeeContactController.findByEmployeeId
)
