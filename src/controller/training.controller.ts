import { Request, Response } from 'express'
import { TrainingModel } from '../model/training.model'

export class TrainingController {
    static async create(req: Request, res: Response) {
        const { title, date, status, location } = req.body

        if (!title || !date || !status || !location) {
            res.status(400).json({
                error: 'Missing data',
            })
            return
        }

        const [error, training] = await TrainingModel.create({
            title,
            date,
            status,
            location,
        })

        if (error) {
            res.status(500).json({
                error: 'Error to create training',
            })
            return
        }

        res.json({
            data: true,
        })
    }

    static async byId(req: Request, res: Response) {
        const { id } = req.params

        const [error, training] = await TrainingModel.byId({
            id: id.toString(),
        })

        if (error) {
            res.status(500).json({
                error: 'Error to get training',
            })
            return
        }

        res.json({
            data: training,
        })
    }

    static async all(req: Request, res: Response) {
        const [error, training] = await TrainingModel.all()

        if (error) {
            res.status(500).json({
                error: 'Error to get all training',
            })
            return
        }

        //@ts-ignore
        if (training.length <= 0) {
            res.status(404).json({
                error: 'Not found',
            })

            return
        }

        res.json({
            data: training,
        })
    }
}
