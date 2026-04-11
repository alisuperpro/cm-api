import { Router } from 'express'
import { TrainingController } from '../controller/training.controller'
import { checkAuth } from '../../../../../shared/insfrastructure/http/middleware/checkAuth.middleware'
import { checkId } from '../../../../../shared/insfrastructure/http/middleware/checkId.middleware'
import { checkAdminAuth } from '../../../../../shared/insfrastructure/http/middleware/checkAdminAuth.middleware'

export const trainingRouter = Router()

const trainingController = new TrainingController()

trainingRouter.get('/', checkAuth, trainingController.getAll)
trainingRouter.get('/:id', checkId, checkAuth, trainingController.findById)

trainingRouter.post('/', checkAdminAuth, trainingController.create)

trainingRouter.post(
    '/upload/banner',
    checkAuth,
    trainingController.uploadBanner
)

trainingRouter.post('/file', checkAuth, trainingController.getUrl)
