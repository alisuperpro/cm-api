import { NextFunction, Request, Response } from 'express'
import { serviceContainer } from '../../../../../shared/insfrastructure/services/serviceContainer'

export class EmailSystemController {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            await serviceContainer.emailSystem.create.run(req.body)
            return res.status(201).send()
        } catch (err) {
            next(err)
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const emails = await serviceContainer.emailSystem.getAll.run()

            return res.status(200).json({
                data: emails,
            })
        } catch (err) {
            next(err)
        }
    }
    async findById(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params

        const email = await serviceContainer.emailSystem.findById.run(
            id.toString()
        )

        if (!email) {
            res.status(404).json({
                message: 'Not found',
            })
            return
        }

        return res.status(200).json({
            data: email,
        })
    }
}
