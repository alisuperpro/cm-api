import { AdminUserModel } from '../model/adminUser.model'
import { sendPushNotification } from '../utils/notification'
import { appEventEmitter } from './eventEmitter'

export async function setupAdminUserService() {
    appEventEmitter.on(
        'userRegisteredOnTraining',
        async ({ trainingName }: { trainingName: string }) => {
            console.log(
                `[Admin User Services] Notificar de un nuevo usuario registrado en un training`
            )
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
                    body: `Nuevo usuario registrado en ${trainingName}`,
                })
            })
        }
    )

    console.log('[User Services] Escuchando eventos')
}
