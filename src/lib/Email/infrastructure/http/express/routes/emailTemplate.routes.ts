import { Router } from 'express'
import { EmailTemplateController } from '../controller/emailTemplate.controller'
import { checkAdminAuth } from '../../../../../shared/insfrastructure/http/middleware/checkAdminAuth.middleware'

export const emailTemplateRouter = Router()

const emailTemplateController = new EmailTemplateController()

emailTemplateRouter.get('/', checkAdminAuth, emailTemplateController.getAll)

emailTemplateRouter.post('/', checkAdminAuth, emailTemplateController.create)
