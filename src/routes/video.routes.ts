import { Router } from 'express'
import { VideoController } from '../controller/video.controller'
import { checkAuth } from '../middleware/checkAuth.middleware'
import { checkAdminAuth } from '../middleware/checkAdminAuth.middleware'

export const videoRouter = Router()

videoRouter.get('/', checkAuth, VideoController.all)

videoRouter.post('/', checkAdminAuth, VideoController.create)

videoRouter.post('/file', checkAuth, VideoController.getUrl)

videoRouter.post('/upload/video', checkAdminAuth, VideoController.uploadVideo)
videoRouter.post(
    '/upload/thumbnail',
    checkAdminAuth,
    VideoController.uploadThumbnail
)
