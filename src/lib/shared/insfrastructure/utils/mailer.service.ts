import logger from '@/lib/shared/insfrastructure/utils/logger'
import { decrypt } from './crypto'
import { createDynamicTransporter } from './transporter'
import { serviceContainer } from '../services/serviceContainer'

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
    const emailData = await serviceContainer.emailSystem.findById.run(configId)
    //@ts-ignore
    const clearPassword = decrypt(emailData.password)

    const transporter = await createDynamicTransporter({
        host: emailData?.host ?? '',
        port: emailData?.port ?? 465,
        user: emailData?.email ?? '',
        pass: clearPassword,
        fromName: emailData?.name ?? '',
    })

    const mailOptions = {
        //@ts-ignore
        from: `"${emailData.name}" <${emailData.email}>`,
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
