import { Request, Response } from 'express'
import { TrainingStatusModel } from '../model/trainingStatus.model'

export class TrainingStatusController {
    static async all(req: Request, res: Response) {
        const [error, result] = await TrainingStatusModel.all()

        if (error) {
            res.status(500).json({
                error: 'Error to get all status',
            })
            return
        }

        if (!result) {
            res.status(404).json({
                error: 'Not found',
            })
            return
        }

        res.json({
            data: result,
        })
    }
}
