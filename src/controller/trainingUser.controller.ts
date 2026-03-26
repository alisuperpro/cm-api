import { Request, Response } from 'express'
import { TrainingUserModel } from '../model/trainingUser.model'
import { UserModel } from '../model/user.model'
import { appEventEmitter } from '../events/eventEmitter'
import { deleteFile, getPresignedUrl, uploadFile } from '../services/s3'

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
            userId: userId,
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
            id: id.toString(),
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
        const { id, trainingId } = req.params
        const { reason } = req.body
        // Obtener el usuario
        const [userError, user] = await TrainingUserModel.byTrainingIdAndUserId(
            {
                userId: id.toString(),
                trainingId: trainingId.toString(),
            }
        )

        if (userError || !user) {
            res.status(404).json({
                error: 'User not found',
            })
            return
        }

        // Eliminar el archivo si existe
        //@ts-ignore
        if (!user.pay_img) {
            res.status(400).json({
                error: 'Error to get pay_img to user',
            })
            return
        }

        //@ts-ignore
        const deletedFile = await deleteFile(user.pay_img)
        if (!deletedFile.$metadata) {
            res.status(400).json({
                error: 'Error to delete file',
            })
            return
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

        appEventEmitter.emit('userRemoveForTraining', {
            id: id.toString(),

            trainingId,
            reason: reason ? reason : 'Diversos motivos',
        })

        res.json({
            data: result,
            message: 'User and associated file deleted successfully',
        })
    }

    static async updateCertificateReceived(req: Request, res: Response) {
        const { id, trainingId } = req.params
        const { isReceived } = req.body

        if (typeof isReceived !== 'boolean') {
            res.status(400).json({
                error: 'Missing fields',
            })
            return
        }

        const [error, result] =
            await TrainingUserModel.updateCertificateReceived({
                id: id.toString(),
                isReceived,
                trainingId: trainingId.toString(),
            })

        if (error) {
            res.status(500).json({
                error: 'Error to update is certificate received',
            })
            return
        }

        res.json({
            data: result,
        })
    }
}
