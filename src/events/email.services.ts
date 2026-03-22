import { sendEmail } from '../mail/mailer.service'
import { TrainingModel } from '../model/training.model'
import { UserModel } from '../model/user.model'

import { appEventEmitter } from './eventEmitter'

export function setupEmailService() {
    appEventEmitter.on('payConfirmed', async ({ id, trainingId }) => {
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
    })

    console.log('[Email Service] Escuchando eventos')
}
