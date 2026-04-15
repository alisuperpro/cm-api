import { NextFunction, Request, Response } from 'express'
import { serviceContainer } from '@/lib/shared/insfrastructure/services/serviceContainer'

export class TrainingTypeController {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            await serviceContainer.trainingType.create.run(req.body)

            return res.status(201).send()
        } catch (err) {
            next(err)
        }
    }

    async getAll(req: Request, res: Response) {
        const type = await serviceContainer.trainingType.getAll.run()

        const data = type.map((el) => el.toPrimitives())

        return res.status(200).json({
            data,
        })
    }
}
