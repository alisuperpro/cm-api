import { Router } from 'express'
import { VisibilityTypeController } from '../controller/visibilityType.controller'
import { checkAdminAuth } from '../middleware/checkAdminAuth.middleware'
import { checkAuth } from '../middleware/checkAuth.middleware'

export const visibilityTypeRouter = Router()

visibilityTypeRouter.get('/', checkAuth, VisibilityTypeController.all)

visibilityTypeRouter.post('/', checkAdminAuth, VisibilityTypeController.create)
