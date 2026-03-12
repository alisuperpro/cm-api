import express, { Request, Response } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'
import { clerkMiddleware } from '@clerk/express'
import { apiRouter } from '../routes/api.routes'
import { setupEmailService } from '../events/email.services'
import { setupAdminUserService } from '../events/adminUser.event'
import { paysUploadDir } from '../routes/trainingUser.routes'
import { videoUploadDir } from '../routes/video.routes'
import { rateLimit } from 'express-rate-limit'
import fileServeController from '../controller/fileServer.controller'
import path from 'path'
const app = express()
dotenv.config()

const origins = process.env.ACCEPTED_ORIGIN?.split(',') ?? ['']
const corsOptions = {
    origin: origins,
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    methods: 'GET,PUT,POST,DELETE',
}

app.use(cors(corsOptions))
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(clerkMiddleware())
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
})

app.use(limiter)

setupEmailService()
setupAdminUserService()

// Definir directorios
const PAYS_UPLOAD_DIR = path.join(__dirname, '../../pays') //paysUploadDir
const VIDEO_UPLOAD_DIR = path.join(__dirname, '../../video')
const THUMBNAIL_UPLOAD_DIR = path.join(__dirname, '../../video')

app.get('/', (req: Request, res: Response) => {
    res.send('hello world')
})

app.get('/healt', (req: Request, res: Response) => {
    res.send('Healt')
})

app.get(
    '/pays/:name',
    fileServeController.serveFile({
        directory: PAYS_UPLOAD_DIR,
        maxAge: 7 * 86400000, // 7 días de caché
        immutable: true, // Para archivos que no cambian
    })
)

app.get(
    '/video/watch/:name',
    fileServeController.serveFile({
        directory: VIDEO_UPLOAD_DIR,
        maxAge: 7 * 86400000, // 7 días de caché
        immutable: true, // Para archivos que no cambian
    })
)

app.get(
    '/video/thumbnail/:name',
    fileServeController.serveFile({
        directory: THUMBNAIL_UPLOAD_DIR,
        maxAge: 7 * 86400000, // 7 días de caché
        immutable: true, // Para archivos que no cambian
    })
)

app.use('/api', apiRouter)

export default app
