import { AdminUserModel } from '../model/adminUser.model'
import { TrainingModel } from '../model/training.model'
import { sendPushNotification } from '../utils/notification'
import { appEventEmitter } from './eventEmitter'

export async function setupAdminUserService() {
    appEventEmitter.on(
        'userRegisteredOnTraining',
        async ({ trainingId }: { trainingId: string }) => {
            console.log(
                `[Admin User Services] Notificar de un nuevo usuario registrado en un training`
            )
            const [trainingError, training] = await TrainingModel.byId({
                id: trainingId,
            })

            if (trainingError) {
                console.log(trainingError)
                return
            }

            const [error, admin] = await AdminUserModel.all()

            if (error) {
                console.log(error)
                return
            }

            //@ts-ignore
            admin.forEach(async (el) => {
                await sendPushNotification({
                    to: el.notification_token,
                    title: `Cache Marketing | nuevo participante`,
                    body: `Nuevo usuario registrado en ${
                        //@ts-ignore
                        training.title
                    }`,
                })
            })
        }
    )

    console.log('[User Services] Escuchando eventos')
}
