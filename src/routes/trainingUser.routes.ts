import { Router } from 'express'
import { TrainingUserController } from '../controller/trainingUser.controller'
import { checkId } from '../middleware/checkId.middleware'
import { checkAuth } from '../middleware/checkAuth.middleware'
import { checkAdminAuth } from '../middleware/checkAdminAuth.middleware'

export const trainingUserRouter = Router()

trainingUserRouter.get('/', checkAdminAuth, TrainingUserController.all)
trainingUserRouter.get(
    '/training/:id',
    checkAdminAuth,
    TrainingUserController.byTrainingId
)
trainingUserRouter.get(
    '/:id',
    checkId,
    checkAdminAuth,
    TrainingUserController.byId
)

trainingUserRouter.post('/', checkAuth, TrainingUserController.create)

trainingUserRouter.put(
    '/is-arrived/:id',
    checkAdminAuth,
    checkId,
    TrainingUserController.updateIsArrived
)
