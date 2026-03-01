import { Request, Response } from 'express'
import { TrainingUserModel } from '../model/trainingUser.model'
import { sendEmail } from '../utils/email'
import { UserModel } from '../model/user.model'

export class TrainingUserController {
    static async create(req: Request, res: Response) {
        const {
            trainingId,
            userId,
            howFind,
            experience,
            additionalInfo,
            payRef,
            payImg,
        } = req.body

        if (
            !trainingId ||
            !userId ||
            !howFind ||
            !experience ||
            !payRef ||
            !payImg
        ) {
            res.status(400).json({
                error: 'Missing fields',
            })
            return
        }

        const [verifyError, verifyResult] =
            await TrainingUserModel.byTrainingIdAndUserId({
                userId,
                trainingId,
            })
        if (verifyError) {
            res.status(500).json({
                error: 'Error to create training user',
            })
            return
        }

        if (verifyResult) {
            res.status(403).json({
                error: 'Error user has been register',
            })
            return
        }

        const [error, result] = await TrainingUserModel.create({
            trainingId,
            userId,
            howFind,
            experience,
            additionalInfo,
            payRef,
            payImg,
            isArrived: false,
        })

        if (error) {
            res.status(500).json({
                error: 'Error to create training user',
            })
            return
        }

        const [userError, user] = await UserModel.me({ id: userId })

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
              Master Class Edición Audiovisual
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
              <strong>Fecha:</strong> viernes, 13 de marzo
            </p>
            <p style="margin:5px 0;">
              <strong>Hora:</strong> 1:30 p. m. - 4:00 p. m.
            </p>
            <p style="margin:5px 0;">
              <strong>Lugar:</strong> Lotería de Oriente
            </p>

            <hr style="border:none; border-top:1px solid #eeeeee; margin:25px 0;">

            <h3 style="margin-bottom:10px;">🎁 Recuerda que tu inscripción incluye:</h3>

            <ul style="padding-left:18px; margin-top:0;">
              <li>Certificado de participación</li>
              <li>Guía digital de apoyo</li>
              <li>Acceso a CapCut Pro por 1 mes</li>
              <li>Recursos audiovisuales descargables</li>
            </ul>

            <p>
              Si deseas practicar durante la sesión, puedes llevar tu laptop (no es obligatorio).
            </p>

            <!-- Botón -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:30px 0;">
              <tr>
                <td align="center">
                  <a href="https://chat.whatsapp.com/CWWSP5aAnsqBWWraHhxND3?mode=gi_t"
                  target='_blank'
                     style="background-color:#000000; color:#ffffff; padding:12px 25px; text-decoration:none; border-radius:5px; font-size:14px; display:inline-block;">
                     Contactar por WhatsApp
                  </a>
                </td>
              </tr>
            </table>

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
        if (userError) {
            res.status(500).json({
                error: 'Error to get user',
            })
            return
        }

        await sendEmail({
            //@ts-ignore
            to: user.email,
            subject:
                'Confirmación de inscripción | Master Class Edición Audiovisual',
            body: body,
        })

        res.json({
            data: result,
        })
    }
    static async all(req: Request, res: Response) {
        const [error, result] = await TrainingUserModel.all()

        if (error) {
            res.status(500).json({
                error: 'Error on database',
            })
            return
        }

        //@ts-ignore
        if (result.length <= 0) {
            res.status(404).json({
                error: 'Not found',
            })
            return
        }

        res.json({
            data: result,
        })
    }
    static async byTrainingId(req: Request, res: Response) {
        const { id } = req.params

        const [error, result] = await TrainingUserModel.byTrainingId({
            trainingId: id.toString(),
        })

        if (error) {
            res.status(500).json({
                error: 'Error to get data',
            })
            return
        }

        res.json({
            data: result,
        })
    }
    static async byId(req: Request, res: Response) {
        const { id } = req.params

        const [error, result] = await TrainingUserModel.byId({
            id: id.toString(),
        })

        if (error) {
            res.status(500).json({
                error: 'Error to get data',
            })
            return
        }

        res.json({
            data: result,
        })
    }
    static async updateIsArrived(req: Request, res: Response) {
        const { id } = req.params
        const { isArrived } = req.body

        if (!isArrived) {
            res.status(400).json({
                error: 'Missing fields',
            })
            return
        }

        const [error, result] = await TrainingUserModel.updateIsArrived({
            id: id.toString(),
            isArrived,
        })

        if (error) {
            res.status(500).json({
                error: 'Error to update is arrived',
            })
            return
        }

        res.json({
            data: result,
        })
    }
}
