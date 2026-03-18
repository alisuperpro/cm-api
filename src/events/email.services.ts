import { TrainingModel } from '../model/training.model'
import { UserModel } from '../model/user.model'
import { sendEmail } from '../utils/email'

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
        const body = `
    <!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Confirmación de Inscripción</title>
</head>

<body style="margin:0; padding:0; background-color:#f4f4f4; font-family: Arial, Helvetica, sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f4f4f4; padding:20px 0;">
  <tr>
    <td align="center">

      <!-- Contenedor principal -->
      <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color:#ffffff; border-radius:8px; overflow:hidden;">

        <!-- Header -->
        <tr>
          <td align="center" style="background-color:#000000; padding:30px;">
            <h1 style="color:#ffffff; margin:0; font-size:22px;">
              ${
                  //@ts-ignore
                  training.title
              }
            </h1>
          </td>
        </tr>

        <!-- Contenido -->
        <tr>
          <td style="padding:30px; color:#333333; font-size:15px; line-height:1.6;">

            <p style="margin-top:0;">
              Hola <strong>${
                  //@ts-ignore
                  user.full_name
              }</strong>,
            </p>

            <p>
              Tu inscripción ha sido <strong>confirmada exitosamente</strong>.  
              ¡Gracias por formar parte de esta experiencia formativa!
            </p>

            <hr style="border:none; border-top:1px solid #eeeeee; margin:25px 0;">

            <h3 style="margin-bottom:10px;">📍 Detalles del Evento</h3>

            <p style="margin:5px 0;">
              <strong>Fecha:</strong> ${
                  //@ts-ignore
                  training.date
              }
            </p>
            <p style="margin:5px 0;">
              <strong>Hora:</strong> ${
                  //@ts-ignore
                  training.start_time
              } - ${
                  //@ts-ignore
                  training.end_time
              }
            </p>
            <p style="margin:5px 0;">
              <strong>Lugar:</strong> ${
                  //@ts-ignore
                  training.location
              }
            </p>

            <hr style="border:none; border-top:1px solid #eeeeee; margin:25px 0;">
          
            <p>
              Nos vemos pronto para vivir una jornada de aprendizaje práctico y profesional.
            </p>

            <p>
              Saludos,<br>
              <strong>Jorge Maurera</strong><br>
              Caché Marketing<br>
              Transformamos ideas en resultados
            </p>

          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td align="center" style="background-color:#f9f9f9; padding:20px; font-size:12px; color:#777777;">
            © 2026 Caché Marketing<br>
            Este correo fue enviado como confirmación de tu inscripción.
          </td>
        </tr>

      </table>
      <!-- Fin contenedor -->

    </td>
  </tr>
</table>

</body>
</html>
    
    `

        try {
            await sendEmail({
                //@ts-ignore
                to: user.email,
                subject: `Confirmación de inscripción | ${
                    //@ts-ignore
                    training.title
                }`,
                body: body,
            })
        } catch (err) {
            console.log(err)
        }
    })

    console.log('[Email Service] Escuchando eventos')
}
