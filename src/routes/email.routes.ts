import { Router } from 'express'
import { EmailController } from '../controller/email.controller'

export const emailRouter = Router()

emailRouter.post('/contact', EmailController.contact)
