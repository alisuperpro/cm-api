import { Request, Response } from 'express'
import { serviceContainer } from '../../../../../shared/insfrastructure/services/serviceContainer'

export class TrainingStatusController {
    async create(req: Request, res: Response) {
        await serviceContainer.trainingStatus.create.run(req.body)

        return res.status(201).send()
    }
    async getAll(req: Request, res: Response) {
        const trainingStatus =
            await serviceContainer.trainingStatus.getAll.run()

        const data = trainingStatus.map((el) => el.toPrimitives())

        return res.status(200).json({
            data,
        })
    }
}
