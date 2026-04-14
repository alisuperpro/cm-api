import { Router } from 'express'
import { EmailSystemController } from '../controller/emailSystem.controller'
import { checkAdminAuth } from '../../../../../shared/insfrastructure/http/middleware/checkAdminAuth.middleware'
import { checkId } from '../../../../../shared/insfrastructure/http/middleware/checkId.middleware'

export const emailSystemRouter = Router()
const emailSystemController = new EmailSystemController()

emailSystemRouter.get('/', checkAdminAuth, emailSystemController.getAll)
emailSystemRouter.get(
    '/:id',
    checkId,
    checkAdminAuth,
    emailSystemController.findById
)

emailSystemRouter.post('/', checkAdminAuth, emailSystemController.create)
