import { Router } from 'express'
import { checkAdminAuth } from '../middleware/checkAdminAuth.middleware'
import { EmailSystemController } from '../controller/emailSystem.controller'

export const emailSystemRouter = Router()

emailSystemRouter.get('/', checkAdminAuth, EmailSystemController.all)

emailSystemRouter.post('/', /* checkAdminAuth, */ EmailSystemController.create)
