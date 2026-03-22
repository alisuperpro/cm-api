import { BUSSINES_DATA, transporter } from './transporte'

export const sendEmail = async ({
    to,
    subject,
    template,
    context,
}: {
    to: string
    subject: string
    template: string
    context: object
}) => {
    const mailOptions = {
        from: BUSSINES_DATA.supportEmail,
        to,
        subject,
        template,
        context,
    }

    try {
        const info = await transporter.sendMail(mailOptions)
        console.log('Email enviado: ' + info.messageId)
        return info
    } catch (error) {
        console.error('Error enviando email:', error)
        throw error
    }
}
