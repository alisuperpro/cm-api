import { Request, Response } from 'express'
import { TrainingTypeModel } from '../model/trainingType.model'

export class TrainingTypeController {
    static async create(req: Request, res: Response) {
        const { type, slug } = req.body

        if (!type || !slug) {
            res.status(400).json({
                error: 'Missing fields',
            })
            return
        }

        const [error, result] = await TrainingTypeModel.create({ type, slug })

        if (error) {
            res.status(500).json({
                error: 'Error to create type',
            })
            return
        }

        res.json({
            data: result,
        })
    }

    static async all(req: Request, res: Response) {
        const [error, result] = await TrainingTypeModel.all()

        if (error) {
            res.status(500).json({
                error: 'Error to get all types',
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
