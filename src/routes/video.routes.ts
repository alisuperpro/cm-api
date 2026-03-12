import { Router } from 'express'
import { VideoController } from '../controller/video.controller'
import multer from 'multer'
import fs from 'fs'
import path from 'path'
import { checkAuth } from '../middleware/checkAuth.middleware'
import { checkAdminAuth } from '../middleware/checkAdminAuth.middleware'
import {
    validateFileSize,
    validateFileType,
} from '../middleware/validation.middleware'
import fileUploadController from '../controller/fileUpload.controller'
import { UPLOAD_FIELDS } from '../utils/const'

export const videoUploadDir = 'video/'
const storage = multer.diskStorage({
    destination: videoUploadDir,
    filename: function (req, file, cb) {
        const originalname = file.originalname
        const extension = path.extname(originalname)
        const basename = path.basename(originalname, extension)

        let newFilename = originalname
        let counter = 1

        // Synchronously check for file existence (or use async fs.access for better performance)
        while (fs.existsSync(path.join(videoUploadDir, newFilename))) {
            newFilename = `${basename}(${counter})${extension}`
            counter++
        }

        cb(null, newFilename)
    },
})
const videoStorage = multer({ storage })

export const videoRouter = Router()

videoRouter.get('/', checkAuth, VideoController.all)

videoRouter.post('/', checkAdminAuth, VideoController.create)

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
)
