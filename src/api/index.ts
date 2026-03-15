import express, { Request, Response } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'
import { clerkMiddleware } from '@clerk/express'
import { apiRouter } from '../routes/api.routes'
import { setupEmailService } from '../events/email.services'
import { setupAdminUserService } from '../events/adminUser.event'

import fileUpload from 'express-fileupload'

const app = express()
dotenv.config()
const corsOptions = {
    origin: function (origin: any, callback: any) {
        // Permitir requests sin origen (como apps móviles o curl)
        if (!origin) return callback(null, true)

        const allowedOrigins = process.env.ACCEPTED_ORIGIN
            ? process.env.ACCEPTED_ORIGIN.split(',').map((o) => o.trim())
            : []

        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error(`Origen ${origin} no permitido por CORS`))
        }
    },
    methods: 'GET,PUT,POST,DELETE,OPTIONS', // Añadido OPTIONS explícitamente
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['set-cookie'],
    optionsSuccessStatus: 204, // Mejor usar 204 para preflight
    credentials: true,
}

/* const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
}) */

app.use(cors(corsOptions))
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(clerkMiddleware())
//app.use(limiter)
app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: './uploads',
    })
)

setupEmailService()
setupAdminUserService()

app.get('/', (req: Request, res: Response) => {
    res.send('hello world')
})

app.get('/healt', (req: Request, res: Response) => {
    res.send('Healt')
})

app.use('/api', apiRouter)

export default app
