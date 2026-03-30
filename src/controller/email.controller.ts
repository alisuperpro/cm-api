import { Request, Response } from 'express'
import { appEventEmitter } from '../events/eventEmitter'
import { emailService } from '../events/email.services'

export class EmailController {
    static async contact(req: Request, res: Response) {
        const { name, email, service, description } = req.body

        appEventEmitter.emit('userContact', {
            name,
            email,
            service,
            description,
            configId: '49864a1b-c15f-4021-8583-53ac43e9eeda',
        })

        res.json({
            data: true,
        })
    }

    static async sendDynamicEmail(req: Request, res: Response) {
        const { to, templateSlug, context, configId } = req.body

        // Validación básica
        if (!to || !templateSlug || !context) {
            return res.status(400).json({ error: 'Missing required fields' })
        }

        try {
            // Llamamos al método que creamos en el EmailService
            await emailService.sendCustomEmail(
                to,
                templateSlug,
                context,
                configId
            )

            return res.status(200).json({ message: 'Email sent successfully' })
        } catch (error) {
            return res.status(500).json({ error: 'Failed to send email' })
        }
    }
}
