import { Router } from 'express'
import { TrainingUserController } from '../controller/trainingUser.controller'
import { checkId } from '../middleware/checkId.middleware'
import { checkAuth } from '../middleware/checkAuth.middleware'

export const trainingUserRouter = Router()

trainingUserRouter.get('/', checkAuth, TrainingUserController.all)
trainingUserRouter.get(
    '/training/:id',
    checkAuth,
    TrainingUserController.byTrainingId
)
trainingUserRouter.get('/:id', checkId, checkAuth, TrainingUserController.byId)

trainingUserRouter.post('/', checkAuth, TrainingUserController.create)

trainingUserRouter.put(
    '/is-arrived/:id',
    checkAuth,
    checkId,
    TrainingUserController.updateIsArrived
)
