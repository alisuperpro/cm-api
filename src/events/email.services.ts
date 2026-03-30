import { sendEmail } from '../mail/mailer.service'
import { TrainingModel } from '../model/training.model'
import { UserModel } from '../model/user.model'
import { appEventEmitter } from './eventEmitter'
import logger from '../utils/logger'
import { UserType } from '../types/user.types'
import Handlebars from 'handlebars'
import { EmailTemplateModel } from '../model/emailTemplate.model'
import dotenv from 'dotenv'
import { EmailSystemModel } from '../model/emailSystem.model'

dotenv.config({
    quiet: true,
})

const renderTemplate = (html: string, context: object) => {
    const template = Handlebars.compile(html)
    return template(context)
}

const EVENT_TO_TEMPLATE_MAP: Record<string, string> = {
    payConfirmed: 'payment-confirmation-email',
    userRemoveForTraining: 'removal-notification-email',
}

const BUSINESS_DATA = {
    name: 'Cache Marketing',
    email: process.env.EMAIL,
}

class EmailService {
    private readonly MAX_RETRIES = 3
    private readonly RETRY_DELAY = 1000 // ms

    constructor() {
        this.setupEventListeners()
    }

    private setupEventListeners(): void {
        appEventEmitter.on('payConfirmed', (data) =>
            this.processEvent('payConfirmed', data)
        )
        appEventEmitter.on('userRemoveForTraining', (data) =>
            this.processEvent('userRemoveForTraining', data)
        )
        appEventEmitter.on('userContact', (data) =>
            this.handlerUserContact('userContact', data)
        )
        logger.info('[Email Service] Event listeners initialized')
    }

    public async sendCustomEmail(
        to: string,
        templateSlug: string,
        customContext: any,
        configId?: string
    ): Promise<void> {
        try {
            const [error, templateData] = await EmailTemplateModel.all({
                slug: templateSlug,
            })

            //@ts-ignore
            if (error || !templateData?.[0]) {
                logger.error(
                    `[Email Service] Template not found: ${templateSlug}`
                )
                return
            }

            const context = {
                ...customContext,
                business_name: BUSINESS_DATA.name,
                business_email: BUSINESS_DATA.email,
            }

            //@ts-ignore
            const htmlContent = renderTemplate(templateData[0].html, context)
            //@ts-ignore
            const subject = renderTemplate(templateData[0].subject, context)

            await this.sendWithRetry({
                to,
                subject,
                template: htmlContent,
                configId: configId ?? '',
                context,
            })

            logger.info(
                `[Email Service] Custom email "${templateSlug}" sent to ${to}`
            )
        } catch (error) {
            logger.error(`[Email Service] Error in sendCustomEmail:`, error)
        }
    }

    private async fetchUserAndTraining(
        userId: string,
        trainingId: string
    ): Promise<{ user: UserType; training: any } | null> {
        const [trainingError, training] = await TrainingModel.byId({
            id: trainingId,
        })
        if (trainingError || !training) {
            logger.error(`[Email Service] Training not found: ${trainingId}`)
            return null
        }

        const [userError, user] = await UserModel.me({ id: userId })
        if (userError || !user) {
            logger.error(`[Email Service] User not found: ${userId}`)
            return null
        }

        return { training, user }
    }

    private prepareContext(eventName: string, source: any, payload: any) {
        const { user, training } = source
        const baseContext = {
            user: { ...user },
            business_name: BUSINESS_DATA.name,
            business_email: BUSINESS_DATA.email,
        }

        if (eventName === 'payConfirmed') {
            return {
                ...baseContext,
                training: { ...training },
                training_banner_url: `https://cachemarketing.net/images/banners/${training.training_slug}.png`,
            }
        }

        if (eventName === 'userRemoveForTraining') {
            return {
                ...baseContext,
                training: { ...training },
                reason: payload.reason,
            }
        }

        return baseContext
    }

    private async processEvent(eventName: string, payload: any): Promise<void> {
        const templateSlug = EVENT_TO_TEMPLATE_MAP[eventName]
        if (!templateSlug) return

        try {
            const data = await this.fetchUserAndTraining(
                payload.id,
                payload.trainingId
            )
            if (!data) return

            const context = this.prepareContext(eventName, data, payload)

            // Reutilizamos la lógica de envío dinámico para no repetir código
            await this.sendCustomEmail(
                data.user.email,
                templateSlug,
                context,
                payload.configId
            )
        } catch (error) {
            logger.error(
                `[Email Service] Error processing ${eventName}:`,
                error
            )
        }
    }

    private async handlerUserContact(eventName: string, payload: any) {
        const { name, email, service, description, configId } = payload
        try {
            const [error, emailData] = await EmailSystemModel.all({
                id: configId,
            })

            //@ts-ignore
            if (error || !emailData?.[0]) {
                logger.error(`[Email Service] Config not found: ${configId}`)
                return
            }

            const html = `
                <p><strong>Nombre:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Servicio:</strong> ${service}</p>
                <p><strong>Descripción:</strong> ${description}</p>
            `

            await this.sendWithRetry({
                //@ts-ignore
                to: emailData[0].email,
                subject: `Consulta ${service}`,
                template: html,
                configId: configId,
                context: {},
            })
        } catch (error) {
            logger.error(`[Email Service] Error in handlerUserContact:`, error)
        }
    }

    private async sendWithRetry(
        emailData: Parameters<typeof sendEmail>[0],
        attempt: number = 1
    ): Promise<void> {
        try {
            await sendEmail(emailData)
        } catch (error) {
            if (attempt < this.MAX_RETRIES) {
                logger.warn(
                    `[Email Service] Attempt ${attempt} failed, retrying in ${this.RETRY_DELAY * attempt}ms...`
                )
                await new Promise((resolve) =>
                    setTimeout(resolve, this.RETRY_DELAY * attempt)
                )
                return this.sendWithRetry(emailData, attempt + 1)
            }
            throw error
        }
    }

    public cleanup(): void {
        appEventEmitter.removeAllListeners('payConfirmed')
        appEventEmitter.removeAllListeners('userRemoveForTraining')
        appEventEmitter.removeAllListeners('userContact')
        logger.info('[Email Service] Cleaned up event listeners')
    }
}

export const emailService = new EmailService()
