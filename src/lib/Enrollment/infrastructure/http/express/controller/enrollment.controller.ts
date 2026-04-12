import { Request, Response } from 'express'
import { serviceContainer } from '../../../../../shared/insfrastructure/services/serviceContainer'
import { generateUUID } from '../../../../../shared/insfrastructure/utils/generateUUID'

export class EnrollmentController {
    async create(req: Request, res: Response) {
        const id = generateUUID()

        await serviceContainer.enrollment.create.run({ id, ...req.body })

        return res.status(201).send()
    }

    async getByTrainingId(req: Request, res: Response) {
        const enrollment = await serviceContainer.enrollment.getByTraining.run(
            req.params.id.toString()
        )

        return res.status(200).json({
            data: enrollment,
        })
    }

    async getAll(req: Request, res: Response) {
        const enrollment = await serviceContainer.enrollment.getAll.run()

        return res.status(200).json({
            data: enrollment,
        })
    }

    async getById(req: Request, res: Response) {
        const { id } = req.params

        const enrollment = await serviceContainer.enrollment.getById.run(
            id.toString()
        )

        return res.status(200).json({ data: enrollment })
    }
}
