import { Request, Response } from 'express'
import { serviceContainer } from '@/shared/insfrastructure/services/serviceContainer'
import { UserNotFoundError } from '@/User/domain/errors/userNotFoundError.error'

export class UserController {
    async create(req: Request, res: Response) {
        await serviceContainer.user.create.run(req.body)

        return res.status(201).send()
    }

    async getAll(req: Request, res: Response) {
        const users = await serviceContainer.user.getAll.run()

        return res.status(200).json({
            data: users,
        })
    }

    async findById(req: Request, res: Response) {
        try {
            const user = await serviceContainer.user.findById.run({
                id: req.params.id.toString(),
            })

            return res.status(200).json({
                data: user,
            })
        } catch (err) {
            if (err instanceof UserNotFoundError) {
                return res.status(404).json({ message: err.message })
            }

            throw err
        }
    }
}
