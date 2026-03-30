import nodemailer from 'nodemailer'
import path from 'path'

// Definimos la interfaz para la configuración dinámica
export interface EmailConfig {
    host: string
    port: number
    user: string
    pass: string
    fromName: string
}

export const createDynamicTransporter = async (config: EmailConfig) => {
    const transporter = nodemailer.createTransport({
        host: config.host,
        port: config.port,
        secure: config.port === 465,
        auth: {
            user: config.user,
            pass: config.pass,
        },
        tls: {
            rejectUnauthorized: false,
        },
        connectionTimeout: 60000,
    })

    // Configuración de Handlebars (import dinámico)
    const hbs = (await import('nodemailer-express-handlebars')).default

    transporter.use(
        'compile',
        hbs({
            viewEngine: {
                layoutsDir: path.join(process.cwd(), 'src/templates/layouts'),
                partialsDir: path.join(process.cwd(), 'src/templates/partials'),
                extname: '.hbs',
                defaultLayout: 'main',
            },
            viewPath: path.join(process.cwd(), 'src/templates'),
            extName: '.hbs',
        })
    )

    return transporter
}
