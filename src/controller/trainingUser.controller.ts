import { Request, Response } from 'express'
import { TrainingUserModel } from '../model/trainingUser.model'
import { UserModel } from '../model/user.model'
import { appEventEmitter } from '../events/eventEmitter'
import fs from 'fs/promises'
import { getPresignedUrl, uploadFile } from '../services/s3'

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

        const createdAt = new Date().getTime()

        const [error, result] = await TrainingUserModel.create({
            trainingId,
            userId,
            howFind,
            experience,
            additionalInfo,
            payRef,
            payImg,
            isArrived: false,
            certificateReceived: false,
            createdAt: createdAt,
        })

        if (error) {
            res.status(500).json({
                error: 'Error to create training user',
            })
            return
        }

        const [userError, user] = await UserModel.me({ id: userId })

        if (userError) {
            res.status(500).json({
                error: 'Error to register user on training',
            })
            return
        }

        appEventEmitter.emit('userRegisteredOnTraining', {
            id: userId,
            //@ts-ignore
            name: user.full_name,
            //@ts-ignore
            email: user.email,
            //@ts-ignore
            trainingId,
        })

        res.json({
            data: result,
        })
    }
    static async all(req: Request, res: Response) {
        const { name, slug } = req.query

        const [error, result] = await TrainingUserModel.all({
            name: name?.toString(),
            slug: slug?.toString(),
        })

        if (error) {
            console.log(error)
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
        const { trainingId, id } = req.params
        const { isArrived } = req.body

        if (typeof isArrived !== 'boolean') {
            res.status(400).json({
                error: 'Missing fields',
            })
            return
        }

        const [error, result] = await TrainingUserModel.updateIsArrived({
            id: id.toString(),
            isArrived,
            trainingId: trainingId.toString(),
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
    static async updatePayConfirmed(req: Request, res: Response) {
        const { id, trainingId } = req.params
        const { payConfirmed } = req.body

        if (typeof payConfirmed !== 'boolean') {
            res.status(400).json({
                error: 'Missing fields',
            })
            return
        }

        const [error, result] = await TrainingUserModel.updatePayConfirmed({
            id: id.toString(),
            payConfirmed,
            trainingId: trainingId.toString(),
        })

        if (error) {
            res.status(500).json({
                error: 'Error to update is arrived',
            })
            return
        }

        appEventEmitter.emit('payConfirmed', {
            id: id,
            trainingId: trainingId.toString(),
        })

        res.json({
            data: result,
        })
    }

    static async uploadUserPay(req: Request, res: Response) {
        //@ts-ignore
        const { pay } = req.files
        const { folder } = req.body
        const { key } = await uploadFile(pay, `pays/${folder}`)

        res.json({
            path: key,
        })
    }

    static async getUrl(req: Request, res: Response) {
        const { file } = req.body

        if (!file) {
            res.status(400).json({
                error: 'Missing fields',
            })
            return
        }

        const url = await getPresignedUrl({
            filename: file,
            expiresIn: 3600,
        })

        res.json({
            url,
        })
    }

    static async deleteUser(req: Request, res: Response) {
        try {
            const { id, trainingId } = req.params

            // Obtener el usuario
            const [userError, user] =
                await TrainingUserModel.byTrainingIdAndUserId({
                    userId: id.toString(),
                    trainingId: trainingId.toString(),
                })

            if (userError || !user) {
                res.status(404).json({
                    error: 'User not found',
                })
                return
            }

            // Eliminar el archivo si existe
            //@ts-ignore
            if (user.pay_img) {
                try {
                    // Convertir la URL a una ruta de archivo local
                    //@ts-ignore
                    const filePath = convertUrlToFilePath(user.pay_img)
                    await fs.unlink(filePath)
                    console.log('Archivo borrado con éxito:', filePath)
                } catch (fileError) {
                    // Log del error pero continuamos con la eliminación del usuario
                    console.error('Error al borrar el archivo:', fileError)
                    // No retornamos error al cliente para no interrumpir la eliminación del usuario
                }
            }

            // Eliminar el usuario de la base de datos
            const [error, result] = await TrainingUserModel.deleteUser({
                id: id.toString(),
                trainingId: trainingId.toString(),
            })

            if (error) {
                res.status(500).json({
                    error: 'Error to delete user',
                })
                return
            }

            res.json({
                data: result,
                message: 'User and associated file deleted successfully',
            })
        } catch (error) {
            console.error('Unexpected error in deleteUser:', error)
            res.status(500).json({
                error: 'Internal server error',
            })
        }
    }
}
