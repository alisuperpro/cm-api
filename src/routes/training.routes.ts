import { Router } from 'express'
import { TrainingController } from '../controller/training.controller'
import { checkId } from '../middleware/checkId.middleware'
import { checkAuth } from '../middleware/checkAuth.middleware'

export const trainingRouter = Router()

trainingRouter.get('/', TrainingController.all)
trainingRouter.get('/:id', checkId, TrainingController.byId)

trainingRouter.post('/', checkAuth, TrainingController.create)
