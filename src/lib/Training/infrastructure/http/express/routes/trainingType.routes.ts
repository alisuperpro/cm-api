import { Router } from 'express'
import { TrainingTypeController } from '../controller/trainingType.controller'
import { checkAuth } from '../../../../../shared/insfrastructure/http/middleware/checkAuth.middleware'
import { checkAdminAuth } from '../../../../../shared/insfrastructure/http/middleware/checkAdminAuth.middleware'

export const trainingTypeRouter = Router()

const trainingTypeController = new TrainingTypeController()

trainingTypeRouter.get('/', checkAuth, trainingTypeController.getAll)
trainingTypeRouter.post('/', checkAdminAuth, trainingTypeController.create)
