import logger from '../../../../utils/logger'
import { sendPushNotification } from '../../../../utils/notification'
import { serviceContainer } from '../services/serviceContainer'
import { appEventEmitter } from './eventEmitter'

interface AdminUser {
    id: string
    notificationToken: string
    role: string
    name?: string
}

class AdminNotificationService {
    private readonly BATCH_SIZE = 10 // Procesar en lotes
    private readonly NOTIFICATION_TIMEOUT = 5000 // 5 segundos timeout
    private isProcessing = false

    constructor() {
        this.setupEventListeners()
    }

    private setupEventListeners(): void {
        appEventEmitter.on(
            'userRegisteredOnTraining',
            this.handleUserRegistered.bind(this)
        )

        logger.info('[Admin Notification Service] Event listeners initialized')
    }

    private async handleUserRegistered(payload: {
        trainingId: string
        userId?: string
    }): Promise<void> {
        const { trainingId, userId } = payload

        logger.info(
            `[Admin Notification Service] Processing userRegisteredOnTraining event for training ${trainingId}`
        )

        // Evitar procesamiento concurrente del mismo evento
        if (this.isProcessing) {
            logger.warn(
                '[Admin Notification Service] Already processing, skipping...'
            )
            return
        }

        this.isProcessing = true

        try {
            // Obtener información del training
            const training = await this.getTrainingInfo(trainingId)

            if (!training) {
                logger.error(
                    `[Admin Notification Service] Training ${trainingId} not found`
                )
                return
            }

            // Obtener todos los administradores
            const admins = await this.getAllAdmins()

            if (!admins || admins.length === 0) {
                logger.warn(
                    '[Admin Notification Service] No admins found to notify'
                )
                return
            }

            // Filtrar admins con tokens válidos
            const validAdmins = this.filterValidAdmins(admins)

            if (validAdmins.length === 0) {
                logger.warn(
                    '[Admin Notification Service] No admins with valid notification tokens'
                )
                return
            }

            logger.info(
                `[Admin Notification Service] Sending notifications to ${validAdmins.length} admins for training: ${training.title}`
            )

            // Enviar notificaciones en lotes
            const results = await this.sendBatchedNotifications(
                validAdmins,
                training.title
            )

            // Registrar resultados
            this.logNotificationResults(results, training.title)
        } catch (error) {
            logger.error(
                '[Admin Notification Service] Error processing event:',
                error
            )

            // Emitir evento de error para monitoreo
            appEventEmitter.emit('adminNotificationFailed', {
                adminId: 'system',
                trainingId,
                error: error instanceof Error ? error.message : 'Unknown error',
            })
        } finally {
            this.isProcessing = false
        }
    }

    private async getTrainingInfo(trainingId: string): Promise<any | null> {
        const training =
            await serviceContainer.training.findById.run(trainingId)

        /* if (error) {
            logger.error(
                `[Admin Notification Service] Error fetching training:`,
                error
            )
            return null
        } */

        if (!training) {
            logger.warn(
                `[Admin Notification Service] Training ${trainingId} not found`
            )
            return null
        }

        return training.toPrimitives()
    }

    private async getAllAdmins(): Promise<AdminUser[]> {
        const admins = await serviceContainer.adminUser.getAll.run()

        /* 
        if (error) {
            logger.error(
                '[Admin Notification Service] Error fetching admins:',
                error
            )
            return []
        } */

        return admins.map((el) => el.toPrimitives()) || []
    }

    private filterValidAdmins(admins: AdminUser[]): AdminUser[] {
        return admins.filter((admin) => {
            const isValid =
                admin &&
                admin.notificationToken &&
                admin.notificationToken.trim() !== ''

            if (!isValid && admin) {
                logger.debug(
                    `[Admin Notification Service] Admin ${admin.id} has invalid token`
                )
            }

            return isValid
        })
    }

    private async sendBatchedNotifications(
        admins: AdminUser[],
        trainingTitle: string
    ): Promise<Array<{ adminId: string; success: boolean; error?: string }>> {
        const results: Array<{
            adminId: string
            success: boolean
            error?: string
        }> = []

        // Procesar en lotes para no sobrecargar el servicio de notificaciones
        for (let i = 0; i < admins.length; i += this.BATCH_SIZE) {
            const batch = admins.slice(i, i + this.BATCH_SIZE)

            const batchPromises = batch.map(async (admin) => {
                try {
                    await this.sendNotificationWithTimeout(admin, trainingTitle)
                    return { adminId: admin.id, success: true }
                } catch (error) {
                    logger.error(
                        `[Admin Notification Service] Failed to send notification to admin ${admin.id}:`,
                        error
                    )
                    return {
                        adminId: admin.id,
                        success: false,
                        error:
                            error instanceof Error
                                ? error.message
                                : 'Unknown error',
                    }
                }
            })

            const batchResults = await Promise.all(batchPromises)
            results.push(...batchResults)

            // Pequeña pausa entre lotes para no saturar
            if (i + this.BATCH_SIZE < admins.length) {
                await this.delay(100)
            }
        }

        return results
    }

    private async sendNotificationWithTimeout(
        admin: AdminUser,
        trainingTitle: string
    ): Promise<void> {
        const notificationPromise = sendPushNotification({
            to: admin.notificationToken,
            title: `Cache Marketing | nuevo participante`,
            body: `Nuevo usuario registrado en ${trainingTitle}`,
        })

        // Timeout para no bloquear
        const timeoutPromise = new Promise((_, reject) => {
            setTimeout(
                () => reject(new Error('Notification timeout')),
                this.NOTIFICATION_TIMEOUT
            )
        })

        await Promise.race([notificationPromise, timeoutPromise])
    }

    private logNotificationResults(
        results: Array<{ adminId: string; success: boolean; error?: string }>,
        trainingTitle: string
    ): void {
        const successful = results.filter((r) => r.success).length
        const failed = results.filter((r) => !r.success).length

        logger.info(
            `[Admin Notification Service] Notifications completed for training "${trainingTitle}": ` +
                `${successful} successful, ${failed} failed`
        )

        if (failed > 0) {
            const failedAdmins = results
                .filter((r) => !r.success)
                .map((r) => ({ adminId: r.adminId, error: r.error }))

            logger.warn(`[Admin Notification Service] Failed notifications:`, {
                failedAdmins,
                trainingTitle,
            })
        }
    }

    private delay(ms: number): Promise<void> {
        return new Promise((resolve) => setTimeout(resolve, ms))
    }

    // Método para notificar a un admin específico (útil para notificaciones individuales)
    public async notifySingleAdmin(
        adminId: string,
        trainingTitle: string,
        additionalData?: Record<string, any>
    ): Promise<boolean> {
        try {
            const admin = await (
                await serviceContainer.adminUser.findById.run(adminId)
            ).toPrimitives()

            /* if (error || !admin) {
                logger.error(
                    `[Admin Notification Service] Admin ${adminId} not found`
                )
                return false
            } */

            if (!admin.notificationToken) {
                logger.warn(
                    `[Admin Notification Service] Admin ${adminId} has no notification token`
                )
                return false
            }

            await sendPushNotification({
                to: admin.notificationToken,
                title: `Cache Marketing | ${additionalData?.title || 'nuevo participante'}`,
                body:
                    additionalData?.body ||
                    `Nuevo usuario registrado en ${trainingTitle}`,
            })

            logger.info(
                `[Admin Notification Service] Notification sent to admin ${adminId}`
            )
            return true
        } catch (error) {
            logger.error(
                `[Admin Notification Service] Error notifying admin ${adminId}:`,
                error
            )
            return false
        }
    }

    // Limpiar listeners
    public cleanup(): void {
        appEventEmitter.removeAllListeners('userRegisteredOnTraining')
        logger.info('[Admin Notification Service] Cleaned up event listeners')
    }
}

// Singleton instance
export const adminNotificationService = new AdminNotificationService()
