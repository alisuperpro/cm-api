import { Router } from 'express'
import { checkAuth } from '../middleware/checkAuth.middleware'
import { TrainingStatusController } from '../controller/trainingStatus.controller'

export const trainingStatusRouter = Router()

trainingStatusRouter.get('/', checkAuth, TrainingStatusController.all)
