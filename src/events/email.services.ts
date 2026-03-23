import { sendEmail } from '../mail/mailer.service'
import { BUSSINES_DATA } from '../mail/transporte'
import { TrainingModel } from '../model/training.model'
import { UserModel } from '../model/user.model'

import { appEventEmitter } from './eventEmitter'

export function setupEmailService() {
    appEventEmitter.on(
        'payConfirmed',
        async ({ id, trainingId }: { id: string; trainingId: string }) => {
            console.log(
                `[Email Service] Enviando correo con la confirmacion de participacion al usuario ${id}`
            )

            const [trainingError, training] = await TrainingModel.byId({
                id: trainingId,
            })

            if (trainingError) {
                console.log(trainingError)
                return
            }

            const [userError, user] = await UserModel.me({ id })

            if (userError) {
                console.log(userError)
                return
            }

            try {
                await sendEmail({
                    //@ts-ignore
                    to: user.email,
                    subject: 'Confirmación de inscripción',
                    template: 'user-register-training',
                    context: {
                        //@ts-ignore
                        training_title: training.title,
                        //@ts-ignore
                        user_full_name: user.full_name,
                        //@ts-ignore
                        training_date: training.date,
                        //@ts-ignore
                        training_start: training.start_time,
                        //@ts-ignore
                        training_end: training.end_time,
                        //@ts-ignore
                        training_location: training.location,
                    },
                })
            } catch (err) {
                console.log(err)
            }
        }
    )

    appEventEmitter.on(
        'userRemoveForTraining',
        async ({
            id,
            trainingId,
            reason,
        }: {
            id: string
            trainingId: string
            reason: string
        }) => {
            console.log(
                `[Email Service] Enviando correo para notificar al usuario que se elimino de la training ${id}`
            )

            const [trainingError, training] = await TrainingModel.byId({
                id: trainingId,
            })

            if (trainingError) {
                console.log(trainingError)
                return
            }

            const [userError, user] = await UserModel.me({ id })

            if (userError) {
                console.log(userError)
                return
            }

            try {
                await sendEmail({
                    //@ts-ignore
                    to: user.email,
                    subject: 'Notificación de Cancelación de Inscripción',
                    template: 'user-deleted-training',
                    context: {
                        //@ts-ignore
                        training_title: training.title,
                        //@ts-ignore
                        full_name: user.full_name,
                        business_email: BUSSINES_DATA.supportEmail,
                        business_name: BUSSINES_DATA.name,
                        reason,
                    },
                })
            } catch (err) {
                console.log(err)
            }
        }
    )

    console.log('[Email Service] Escuchando eventos')
}
