import { Router } from 'express'
import { userRouter } from './user.routes'
import { trainingRouter } from './training.routes'
import { trainingUserRouter } from './trainingUser.routes'
import { adminUserRouter } from './adminUser.routes'
import { videoRouter } from './video.routes'
import { videoCategoryRouter } from './videoCategory.routes'
import { visibilityTypeRouter } from './visibilityType.routes'
import { videoUserRouter } from './videoUser.routes'
import { trainingTypeRouter } from './trainingType.routes'
import { trainingStatusRouter } from './trainingStatus.routes'

export const apiRouter = Router()

apiRouter.use('/user', userRouter)
apiRouter.use('/training', trainingRouter)
apiRouter.use('/training-user', trainingUserRouter)
apiRouter.use('/admin-user', adminUserRouter)
apiRouter.use('/video', videoRouter)
apiRouter.use('/video-category', videoCategoryRouter)
apiRouter.use('/visibility-type', visibilityTypeRouter)
apiRouter.use('/video-user', videoUserRouter)
apiRouter.use('/training-type', trainingTypeRouter)
apiRouter.use('/training-status', trainingStatusRouter)
