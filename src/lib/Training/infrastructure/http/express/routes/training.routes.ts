import { Router } from 'express'
import { TrainingController } from '@/lib/Training/infrastructure/http/express/controller/training.controller'
import { checkAuth } from '@/lib/shared/insfrastructure/http/middleware/checkAuth.middleware'
import { checkId } from '@/lib/shared/insfrastructure/http/middleware/checkId.middleware'
import { checkAdminAuth } from '@/lib/shared/insfrastructure/http/middleware/checkAdminAuth.middleware'

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
