import { Router } from 'express'
import { VideoController } from '../controller/video.controller'
import multer from 'multer'
import fs from 'fs'
import path from 'path'
import { checkAuth } from '../middleware/checkAuth.middleware'
import { checkAdminAuth } from '../middleware/checkAdminAuth.middleware'

export const videoUploadDir = 'video/'
const storage = multer.diskStorage({
    destination: videoUploadDir,
    filename: function (req, file, cb) {
        console.log(file)
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
    '/upload-video',
    checkAdminAuth,
    videoStorage.single('video'),
    (req, res, next) => {
        console.log(req.file)
        //@ts-ignore
        const pathToFile = req.file.filename

        if (process.env.NODE_ENV !== 'production') {
            res.json({
                path: `${req.protocol}://${req.hostname}:${
                    process.env.PORT || 3500
                }/video/watch/${pathToFile}`,
            })
        } else {
            res.json({
                path: `https://${req.hostname}/video/watch/${pathToFile}`,
            })
        }
    }
)

videoRouter.post(
    '/upload-thumbnail',
    checkAdminAuth,
    videoStorage.single('thumbnail'),
    (req, res, next) => {
        console.log(req.file)
        //@ts-ignore
        const pathToFile = req.file.filename

        if (process.env.NODE_ENV !== 'production') {
            res.json({
                path: `${req.protocol}://${req.hostname}:${
                    process.env.PORT || 3500
                }/video/thumbnail/${pathToFile}`,
            })
        } else {
            res.json({
                path: `https://${req.hostname}/video/thumbnail/${pathToFile}`,
            })
        }
    }
)
