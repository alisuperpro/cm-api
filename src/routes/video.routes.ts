import { Router } from 'express'
import { VideoController } from '../controller/video.controller'
import { checkAuth } from '../middleware/checkAuth.middleware'
import { checkAdminAuth } from '../middleware/checkAdminAuth.middleware'

export const videoRouter = Router()

videoRouter.get('/', checkAuth, VideoController.all)

videoRouter.post('/', checkAdminAuth, VideoController.create)
/* 
videoRouter.post(
    '/upload/video',
    checkAdminAuth,
    videoStorage.single(UPLOAD_FIELDS.VIDEO),
    validateFileType(['video/mp4', 'video/avi']),
    validateFileSize(30 * 1024 * 1024), // 30MB
    fileUploadController.handleUpload({
        basePath: 'video/watch',
        includeMetadata: true,
    })
)

videoRouter.post(
    '/upload/thumbnail',
    checkAdminAuth,
    videoStorage.single(UPLOAD_FIELDS.THUMBNAIL),
    validateFileType(['image/jpeg', 'image/png', 'application/pdf']),
    validateFileSize(5 * 1024 * 1024), // 5MB
    fileUploadController.handleUpload({
        basePath: 'video/thumbnail',
        includeMetadata: true,
    })
) */
