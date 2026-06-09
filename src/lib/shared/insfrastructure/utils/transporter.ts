import nodemailer from 'nodemailer'

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

    return transporter
}
