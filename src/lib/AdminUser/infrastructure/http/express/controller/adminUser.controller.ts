import { NextFunction, Request, Response } from 'express'
import { serviceContainer } from '../../../../../shared/insfrastructure/services/serviceContainer'
import { AdminUserNotFoundError } from '../../../../domain/errors/adminUserNotFoundError.error'

export class AdminUserController {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            await serviceContainer.adminUser.create.run(req.body)

            return res.status(201).send()
        } catch (err) {
            next(err)
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const adminUsers = await serviceContainer.adminUser.getAll.run()

            return res.status(200).json({
                data: adminUsers,
            })
        } catch (err) {
            next(err)
        }
    }

    async findById(req: Request, res: Response, next: NextFunction) {
        try {
            const adminUser = await serviceContainer.adminUser.findById.run(
                req.params.id.toString()
            )

            return res.status(200).json({
                data: adminUser,
            })
        } catch (err) {
            if (err instanceof AdminUserNotFoundError) {
                return res.status(404).json({ message: err.message })
            }
            next(err)
        }
    }

    async updateNotificationToken(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            await serviceContainer.adminUser.updateNotificationToken.run({
                id: req.params.id.toString(),
                token: req.body.token,
            })

            return res.status(201).send()
        } catch (err) {
            next(err)
        }
    }
}
