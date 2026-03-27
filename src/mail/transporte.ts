import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({
    quiet: true,
})

export const BUSSINES_DATA = {
    name: 'Cache Marketing',
    web: 'cachemarketing.net',
    supportEmail: process.env.EMAIL,
    supportEmailPassword: process.env.EMAIL_PASSWORD,
    supportEmailName: 'Cache Marketing',
    emailHost: process.env.EMAIL_HOST,
} as const

const port = Number(process.env.EMAIL_PORT)

export const transporter = nodemailer.createTransport({
    host: BUSSINES_DATA.emailHost,
    port: port,
    secure: port !== 465 ? false : true, // true for 465, false for other ports
    auth: {
        user: BUSSINES_DATA.supportEmail,
        pass: BUSSINES_DATA.supportEmailPassword,
    },
    tls: {
        rejectUnauthorized: false, // Temporal para diagnóstico
    },
    debug: true,
    connectionTimeout: 60000, // 1 minute
    greetingTimeout: 30000, // 30 seconds
    socketTimeout: 300000, // 5 minutes
})
// 1. Elimina el import de arriba:
// import hbs from 'nodemailer-express-handlebars' <-- BORRA ESTO

// 2. Crea una función para configurar el Handlebars de forma asíncrona
const setupHbs = async () => {
    const hbs = (await import('nodemailer-express-handlebars')).default

    transporter.use(
        'compile',
        hbs({
            viewEngine: {
                layoutsDir: path.join(__dirname, 'templates/layouts'),
                partialsDir: path.join(__dirname, 'templates/partials'),
                extname: '.hbs',
                defaultLayout: 'main',
            },
            viewPath: path.join(__dirname, 'templates'),
            extName: '.hbs',
        })
    )
}

// 3. Ejecuta la configuración
setupHbs().catch((err) => console.error('Error cargando hbs:', err))
