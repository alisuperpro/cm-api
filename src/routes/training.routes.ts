import { Router } from 'express'
import { TrainingController } from '../controller/training.controller'
import { checkId } from '../middleware/checkId.middleware'
import { checkAdminAuth } from '../middleware/checkAdminAuth.middleware'

export const trainingRouter = Router()

trainingRouter.get('/', TrainingController.all)
trainingRouter.get('/:id', checkId, TrainingController.byId)

trainingRouter.post('/', checkAdminAuth, TrainingController.create)
