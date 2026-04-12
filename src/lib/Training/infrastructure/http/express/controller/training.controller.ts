import { Request, Response } from 'express'
import { serviceContainer } from '../../../../../shared/insfrastructure/services/serviceContainer'
import { TrainingNotFoundError } from '../../../../domain/error/trainingNotFoundError.error'
import { getPresignedUrl, uploadFile } from '../../../../../../services/s3'

export class TrainingController {
    async create(req: Request, res: Response) {
        await serviceContainer.training.create.run(req.body)

        return res.status(201).send()
    }

    async getAll(req: Request, res: Response) {
        const trainings = await serviceContainer.training.getAll.run()

        const data = trainings.map((training) => training.toPrimitives())

        return res.status(200).json({
            data,
        })
    }

    async findById(req: Request, res: Response) {
        try {
            const training = await serviceContainer.training.findById.run(
                req.params.id.toString()
            )

            return res.status(200).json({
                data: training.toPrimitives(),
            })
        } catch (err) {
            if (err instanceof TrainingNotFoundError) {
                return res.status(404).json({
                    message: err.message,
                })
            }
            throw err
        }
    }

    async uploadBanner(req: Request, res: Response) {
        //@ts-ignore
        const { banner } = req.files
        const { folder } = req.body
        const { key } = await uploadFile(banner, `training/${folder}`)

        res.json({
            path: key,
        })
    }

    async getUrl(req: Request, res: Response) {
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
