import express, { Request, Response } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'
import { clerkMiddleware } from '@clerk/express'
import { apiRouter } from '../routes/api.routes'
import { setupEmailService } from '../events/email.services'
import { setupAdminUserService } from '../events/adminUser.event'

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
