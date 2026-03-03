import { Router } from 'express'
import { userRouter } from './user.routes'
import { trainingRouter } from './training.routes'
import { trainingUserRouter } from './trainingUser.routes'
import { adminUserRouter } from './adminUser.routes'

export const apiRouter = Router()

apiRouter.use('/user', userRouter)
apiRouter.use('/training', trainingRouter)
apiRouter.use('/training-user', trainingUserRouter)
apiRouter.use('/admin-user', adminUserRouter)
