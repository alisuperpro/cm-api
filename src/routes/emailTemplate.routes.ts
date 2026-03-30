import { Router } from 'express'
import { checkAdminAuth } from '../middleware/checkAdminAuth.middleware'
import { EmailTemplateController } from '../controller/emailTemplate.controller'

export const emailTemplateRouter = Router()

emailTemplateRouter.get('/', checkAdminAuth, EmailTemplateController.all)

emailTemplateRouter.post(
    '/',
    /* checkAdminAuth, */ EmailTemplateController.create
)
