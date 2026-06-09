import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'
import { clerkMiddleware } from '@clerk/express'

import fileUpload from 'express-fileupload'
import { TursoDatabase } from '@/lib/shared/insfrastructure/database/turso.db'
import { apiRouter } from '@/lib/shared/insfrastructure/http/routes/api.routes'
import logger from '@/lib/shared/insfrastructure/utils/logger'
import { appEventEmitter } from '@/lib/shared/insfrastructure/events/eventEmitter'

const app = express()

const origins = process.env.ACCEPTED_ORIGIN
    ? process.env.ACCEPTED_ORIGIN.split(',').map((o) => o.trim())
    : []

dotenv.config({
    quiet: true,
})
const corsOptions = {
    origin: origins,
    methods: 'GET,PUT,POST,DELETE,OPTIONS', // Añadido OPTIONS explícitamente
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['set-cookie'],
    optionsSuccessStatus: 200, // Mejor usar 204 para preflight
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

app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof Error) {
        console.error(err.stack)
        return res.status(500).json({ message: err.message })
    }
    console.error(err)
    return res.status(500).json({ message: 'Something went wrong' })
})

async function bootstrap() {
    await TursoDatabase.getInstance().initialize()

    try {
        const { emailService } =
            await import('@/lib/shared/insfrastructure/events/email.services')
        const { adminNotificationService } =
            await import('@/lib/shared/insfrastructure/events/adminNotification.event')

        logger.info('Email service loaded', { emailService: !!emailService })
    } catch (err) {
        console.log(err)
        logger.error('Failed to load email service', { err })
    }

    logger.info('Event listeners registered', {
        payConfirmed: appEventEmitter.listenerCount('payConfirmed'),
    })

    app.listen(process.env.PORT, () => {
        logger.info(`Server running on port ${process.env.PORT}`)
    })
}

bootstrap()

app.get('/', (req: Request, res: Response) => {
    res.send('hello world')
})

app.get('/healt', (req: Request, res: Response) => {
    res.send('Healt')
})

app.use('/api', apiRouter)

export default app
