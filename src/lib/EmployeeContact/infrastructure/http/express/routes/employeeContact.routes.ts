import { Router } from 'express'
import { EmployeeContactController } from '../controller/employeeContact.controller'

export const employeeContactRouter = Router()

const employeeContactController = new EmployeeContactController()

employeeContactRouter.post('/', employeeContactController.create)

employeeContactRouter.get(
    '/employee/:id',
    employeeContactController.findByEmployeeId
)
