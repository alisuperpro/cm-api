import { Router } from 'express'
import { TrainingTypeController } from '../controller/trainingType.controller'
import { checkAuth } from '../middleware/checkAuth.middleware'
import { checkAdminAuth } from '../middleware/checkAdminAuth.middleware'

export const trainingTypeRouter = Router()

trainingTypeRouter.get('/', checkAuth, TrainingTypeController.all)
trainingTypeRouter.post('/', checkAdminAuth, TrainingTypeController.create)
