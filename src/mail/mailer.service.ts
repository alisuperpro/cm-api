import logger from '@/utils/logger'
import { EmailSystemModel } from '../model/emailSystem.model'
import { decrypt } from '../utils/crypto'
import { createDynamicTransporter } from './transporte'

export const sendEmail = async ({
    to,
    subject,
    template,
    context,
    configId,
}: {
    to: string
    subject: string
    template: string
    context: any
    configId: string
}) => {
    const [error, emailData] = await EmailSystemModel.all({ id: configId })
    if (error) throw new Error('Configuración no encontrada')

    //@ts-ignore
    const clearPassword = decrypt(emailData[0].password)

    const transporter = await createDynamicTransporter({
        //@ts-ignore
        host: emailData[0].host,
        //@ts-ignore
        port: emailData[0].port,
        //@ts-ignore
        user: emailData[0].email,
        pass: clearPassword, // <--- Password real
        //@ts-ignore
        fromName: emailData[0].name,
    })

    const mailOptions = {
        //@ts-ignore
        from: `"${emailData[0].name}" <${emailData[0].email}>`,
        to,
        subject,
        html: template,
    }
    try {
        const info = await transporter.sendMail(mailOptions)
        logger.info('Email enviado: ' + info.messageId)
        return info
    } catch (error) {
        logger.warn('Error enviando email:', error)
        throw error
    }
}
