import { Request, Response } from 'express'
import { TrainingModel } from '../model/training.model'
import { getPresignedUrl, uploadFile } from '../services/s3'

export class TrainingController {
    static async create(req: Request, res: Response) {
        const {
            title,
            date,
            statusId,
            location,
            startTime,
            endTime,
            banner,
            typeId,
            capacity,
            slug,
            description,
        } = req.body

        if (
            !title ||
            !date ||
            !statusId ||
            !location ||
            !startTime ||
            !endTime ||
            !banner ||
            !typeId ||
            !capacity ||
            !slug
        ) {
            res.status(400).json({
                error: 'Missing data',
            })
            return
        }

        const createdAt = new Date().toISOString()

        const [error, training] = await TrainingModel.create({
            title,
            date,
            statusId,
            location,
            startTime,
            endTime,
            banner,
            typeId,
            capacity,
            slug,
            description,
            createdAt,
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
            console.log(error)
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

    static async uploadBanner(req: Request, res: Response) {
        //@ts-ignore
        const { banner } = req.files
        const { folder } = req.body
        const { key } = await uploadFile(banner, `training/${folder}`)

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
            expiresIn: 3600 * 24,
        })

        res.json({
            url,
        })
    }
}
