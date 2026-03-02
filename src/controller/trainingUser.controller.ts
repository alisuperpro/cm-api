import { Request, Response } from 'express'
import { TrainingUserModel } from '../model/trainingUser.model'
import { sendEmail } from '../utils/email'
import { UserModel } from '../model/user.model'
import { appEventEmitter } from '../events/eventEmitter'

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
