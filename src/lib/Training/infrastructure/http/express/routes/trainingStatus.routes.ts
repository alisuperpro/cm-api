import { Router } from 'express'
import { TrainingStatusController } from '../controller/trainingStatus.controller'
import { checkAuth } from '../../../../../shared/insfrastructure/http/middleware/checkAuth.middleware'
import { checkAdminAuth } from '../../../../../shared/insfrastructure/http/middleware/checkAdminAuth.middleware'

export const trainingStatusRouter = Router()

const trainingStatusController = new TrainingStatusController()

trainingStatusRouter.post('/', checkAdminAuth, trainingStatusController.create)

trainingStatusRouter.get('/', checkAuth, trainingStatusController.getAll)
