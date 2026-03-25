import { Router } from 'express'
import { TrainingUserController } from '../controller/trainingUser.controller'
import { checkId } from '../middleware/checkId.middleware'
import { checkAuth } from '../middleware/checkAuth.middleware'
import { checkAdminAuth } from '../middleware/checkAdminAuth.middleware'
import { checkProtocolAuth } from '../middleware/checkProtocolAuth.middleware'
import { checkTrainingId } from '../middleware/checkTrainingId.middleware'
import { checkTrainingDate } from '../middleware/checkTrainingDate.middleware'

export const trainingUserRouter = Router()

trainingUserRouter.get('/', checkProtocolAuth, TrainingUserController.all)
trainingUserRouter.get(
    '/training/:id',
    checkProtocolAuth,
    TrainingUserController.byTrainingId
)
trainingUserRouter.get(
    '/:id',
    checkId,
    checkProtocolAuth,
    TrainingUserController.byId
)

trainingUserRouter.post('/', checkAdminAuth, TrainingUserController.create)

trainingUserRouter.post(
    '/upload/pay',
    checkAuth,
    TrainingUserController.uploadUserPay
)

trainingUserRouter.post('/file', checkAuth, TrainingUserController.getUrl)

trainingUserRouter.put(
    '/is-arrived/:trainingId/:id',
    checkAdminAuth,
    checkTrainingId,
    checkId,
    TrainingUserController.updateIsArrived
)

trainingUserRouter.put(
    '/pay-confirmed/:trainingId/:id',
    checkAdminAuth,
    checkTrainingId,
    checkId,
    checkTrainingDate,
    TrainingUserController.updatePayConfirmed
)

trainingUserRouter.put(
    '/certificate-received/:trainingId/:id',
    checkAdminAuth,
    checkTrainingId,
    checkId,
    checkTrainingDate,
    TrainingUserController.updateCertificateReceived
)

trainingUserRouter.delete(
    '/delete/:trainingId/:id',
    checkAdminAuth,
    checkTrainingId,
    checkId,
    checkTrainingDate,
    TrainingUserController.deleteUser
)
