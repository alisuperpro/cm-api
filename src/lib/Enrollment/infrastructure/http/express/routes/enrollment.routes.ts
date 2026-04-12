import { Router } from 'express'
import { EnrollmentController } from '../controller/enrollment.controller'
import { checkProtocolAuth } from '../../../../../shared/insfrastructure/http/middleware/checkProtocolAuth.middleware'
import { checkId } from '../../../../../shared/insfrastructure/http/middleware/checkId.middleware'
import { checkAuth } from '../../../../../shared/insfrastructure/http/middleware/checkAuth.middleware'
import { checkAdminAuth } from '../../../../../shared/insfrastructure/http/middleware/checkAdminAuth.middleware'
import { checkTrainingId } from '../../../../../shared/insfrastructure/http/middleware/checkTrainingId.middleware'
import { checkTrainingDate } from '../../../../../shared/insfrastructure/http/middleware/checkTrainingDate.middleware'

export const trainingUserRouter = Router()

const enrollmentController = new EnrollmentController()

trainingUserRouter.get('/', checkProtocolAuth, enrollmentController.getAll)
trainingUserRouter.get(
    '/training/:id',
    checkId,
    checkProtocolAuth,
    enrollmentController.getByTrainingId
)
trainingUserRouter.get(
    '/:id',
    checkId,
    checkProtocolAuth,
    enrollmentController.getById
)

trainingUserRouter.post('/', checkAuth, enrollmentController.create)
trainingUserRouter.post(
    '/upload/pay',
    checkAuth,
    enrollmentController.uploadUserPay
)
trainingUserRouter.post('/file', checkAuth, enrollmentController.getUrl)

trainingUserRouter.put(
    '/is-arrived/:trainingId/:userId',
    checkAdminAuth,
    checkTrainingId,
    enrollmentController.updateIsArrived
)
trainingUserRouter.put(
    '/pay-confirmed/:trainingId/:userId',
    checkAdminAuth,
    checkTrainingId,
    checkTrainingDate,
    enrollmentController.updatePayConfirmed
)
/* 

trainingUserRouter.put(
    '/certificate-received/:trainingId/:id',
    checkAdminAuth,
    checkTrainingId,
    checkId,
    checkTrainingDate,
    enrollmentController.updateCertificateReceived
)

trainingUserRouter.delete(
    '/delete/:trainingId/:id',
    checkAdminAuth,
    checkTrainingId,
    checkId,
    checkTrainingDate,
    enrollmentController.deleteUser
)
 */
