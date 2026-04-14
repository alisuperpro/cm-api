import { Router } from 'express'
import { userRouter } from '../../../../User/infrastructure/http/express/routes/user.routes'
import { trainingRouter } from '../../../../Training/infrastructure/http/express/routes/training.routes'
import { adminUserRouter } from '../../../../AdminUser/infrastructure/http/express/routes/adminUser.routes'
import { trainingStatusRouter } from '../../../../Training/infrastructure/http/express/routes/trainingStatus.routes'
import { trainingTypeRouter } from '../../../../Training/infrastructure/http/express/routes/trainingType.routes'
import { trainingUserRouter } from '../../../../Enrollment/infrastructure/http/express/routes/enrollment.routes'
import { emailSystemRouter } from '../../../../Email/infrastructure/http/express/routes/emailSystem.routes'
import { emailTemplateRouter } from '../../../../Email/infrastructure/http/express/routes/emailTemplate.routes'

export const apiRouter = Router()

apiRouter.use('/user', userRouter)
apiRouter.use('/training', trainingRouter)
apiRouter.use('/training-type', trainingTypeRouter)
apiRouter.use('/training-status', trainingStatusRouter)
apiRouter.use('/training-user', trainingUserRouter)
apiRouter.use('/admin-user', adminUserRouter)
apiRouter.use('/email-system', emailSystemRouter)
apiRouter.use('/email-template', emailTemplateRouter)
//apiRouter.use('/video', videoRouter)
//apiRouter.use('/video-category', videoCategoryRouter)
//apiRouter.use('/visibility-type', visibilityTypeRouter)
//apiRouter.use('/video-user', videoUserRouter)
//apiRouter.use('/email', emailRouter)
