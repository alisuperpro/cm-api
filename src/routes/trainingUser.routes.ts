import { Router } from 'express'
import { TrainingUserController } from '../controller/trainingUser.controller'
import { checkId } from '../middleware/checkId.middleware'
import { checkAuth } from '../middleware/checkAuth.middleware'
import { checkAdminAuth } from '../middleware/checkAdminAuth.middleware'
import multer from 'multer'
import fs from 'fs'
import path from 'path'
import { checkProtocolAuth } from '../middleware/checkProtocolAuth.middleware'

export const paysUploadDir = 'pays/'
const storage = multer.diskStorage({
    destination: paysUploadDir,
    filename: function (req, file, cb) {
        const originalname = file.originalname
        const extension = path.extname(originalname)
        const basename = path.basename(originalname, extension)

        let newFilename = originalname
        let counter = 1

        // Synchronously check for file existence (or use async fs.access for better performance)
        while (fs.existsSync(path.join(paysUploadDir, newFilename))) {
            newFilename = `${basename}(${counter})${extension}`
            counter++
        }

        cb(null, newFilename)
    },
})
const trainingPayImg = multer({ storage })

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
    '/upload-pay',
    checkAuth,
    trainingPayImg.single('pay-img'),
    (req, res, next) => {
        //@ts-ignore
        const pathToFile = req.file.filename

        if (process.env.NODE_ENV !== 'production') {
            res.json({
                path: `${req.protocol}://${req.hostname}:${
                    process.env.PORT || 3500
                }/pays/${pathToFile}`,
            })
        } else {
            res.json({ path: `https://${req.hostname}/pays/${pathToFile}` })
        }
    }
)

trainingUserRouter.put(
    '/is-arrived/:trainingId/:id',
    checkAdminAuth,
    checkId,
    TrainingUserController.updateIsArrived
)

trainingUserRouter.put(
    '/pay-confirmed/:trainingId/:id',
    checkAdminAuth,
    checkId,
    TrainingUserController.updatePayConfirmed
)
