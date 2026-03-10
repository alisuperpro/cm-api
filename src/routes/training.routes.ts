import { Router } from 'express'
import { TrainingController } from '../controller/training.controller'
import { checkId } from '../middleware/checkId.middleware'
import { checkAdminAuth } from '../middleware/checkAdminAuth.middleware'
import { checkAuth } from '../middleware/checkAuth.middleware'

export const trainingRouter = Router()

trainingRouter.get('/', checkAuth, TrainingController.all)
trainingRouter.get('/:id', checkId, checkAuth, TrainingController.byId)

trainingRouter.post('/', checkAdminAuth, TrainingController.create)
