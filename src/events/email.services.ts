import { sendEmail } from '../mail/mailer.service'
import { BUSSINES_DATA } from '../mail/transporte'
import { TrainingModel } from '../model/training.model'
import { UserModel } from '../model/user.model'
import { appEventEmitter } from './eventEmitter'
import logger from '../utils/logger'
import { UserType } from '../types/user.types'

class EmailService {
    private readonly MAX_RETRIES = 3
    private readonly RETRY_DELAY = 1000 // ms

    constructor() {
        this.setupEventListeners()
    }

    private setupEventListeners(): void {
        appEventEmitter.on('payConfirmed', this.handlePayConfirmed.bind(this))
        appEventEmitter.on(
            'userRemoveForTraining',
            this.handleUserRemoval.bind(this)
        )

        logger.info('[Email Service] Event listeners initialized')
    }

    private async handlePayConfirmed(payload: {
        id: string
        trainingId: string
    }): Promise<void> {
        const { id, trainingId } = payload

        logger.info(
            `[Email Service] Processing payConfirmed event for user ${id}`
        )

        try {
            const result = await this.fetchUserAndTraining(id, trainingId)

            if (!result) {
                logger.error(
                    `[Email Service] Failed to fetch data for user ${id}`
                )
                return
            }

            const { user, training } = result

            await this.sendWithRetry({
                to: user.email,
                subject: 'Confirmación de inscripción',
                template: 'user-register-training',
                context: {
                    training_title: training.title,
                    user_full_name: user.full_name,
                    training_date: training.date,
                    training_start: training.start_time,
                    training_end: training.end_time,
                    training_location: training.location,
                },
            })

            logger.info(
                `[Email Service] Payment confirmation email sent to user ${id}`
            )
        } catch (error) {
            logger.error(`[Email Service] Error in payConfirmed event:`, error)
            // Aquí podrías emitir un evento de error para monitoreo
        }
    }

    private async handleUserRemoval(payload: {
        id: string
        trainingId: string
        reason: string
    }): Promise<void> {
        const { id, trainingId, reason } = payload

        logger.info(
            `[Email Service] Processing userRemoveForTraining event for user ${id}`
        )

        try {
            const result = await this.fetchUserAndTraining(id, trainingId)

            if (!result) {
                logger.error(
                    `[Email Service] Failed to fetch data for user ${id}`
                )
                return
            }

            const { user, training } = result

            await this.sendWithRetry({
                to: user.email,
                subject: 'Notificación de Cancelación de Inscripción',
                template: 'user-deleted-training',
                context: {
                    training_title: training.title,
                    full_name: user.full_name,
                    business_email: BUSSINES_DATA.supportEmail,
                    business_name: BUSSINES_DATA.name,
                    reason,
                },
            })

            logger.info(
                `[Email Service] Removal notification email sent to user ${id}`
            )
        } catch (error) {
            logger.error(
                `[Email Service] Error in userRemoveForTraining event:`,
                error
            )
        }
    }

    private async fetchUserAndTraining(
        userId: string,
        trainingId: string
    ): Promise<{ user: UserType; training: any } | null> {
        const [trainingError, training] = await TrainingModel.byId({
            id: trainingId,
        })

        if (trainingError) {
            logger.error(
                `[Email Service] Error fetching training ${trainingId}:`,
                trainingError
            )
            return null
        }

        const [userError, user] = await UserModel.me({ id: userId })

        if (userError) {
            logger.error(
                `[Email Service] Error fetching user ${userId}:`,
                userError
            )
            return null
        }

        if (!training || !user) {
            logger.warn(
                `[Email Service] Missing data - training: ${!!training}, user: ${!!user}`
            )
            return null
        }

        return { training, user }
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
                    `[Email Service] Email sending failed (attempt ${attempt}/${this.MAX_RETRIES}), retrying...`,
                    error
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
        logger.info('[Email Service] Cleaned up event listeners')
    }
}

// Singleton instance
export const emailService = new EmailService()
