/* import { Router } from 'express'
import { VideoCategoryController } from '../controller/videoCategory.controller'
import { checkAdminAuth } from '../middleware/checkAdminAuth.middleware'
import { checkAuth } from '../middleware/checkAuth.middleware'

export const videoCategoryRouter = Router()

videoCategoryRouter.get('/', checkAuth, VideoCategoryController.all)

videoCategoryRouter.post('/', checkAdminAuth, VideoCategoryController.create)
 */
