import { NextFunction, Request, Response } from 'express'
import { serviceContainer } from '@/lib/shared/insfrastructure/services/serviceContainer'
import { UserNotFoundError } from '@/lib/User/domain/errors/userNotFoundError.error'
import { UserPhoneExistsError } from '@/lib/User/domain/errors/userPhoneExistsError.error'
import { UserDocIdExistsError } from '@/lib/User/domain/errors/userDocIdExistsError.error'
import { UserIgUsernameExistsError } from '@/lib/User/domain/errors/userIgUsernameExistsError.error'
import { UserTiktokUsernameExistsError } from '@/lib/User/domain/errors/userTiktokUsernameError.error'

export class UserController {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            await serviceContainer.user.create.run(req.body)

            return res.status(201).send()
        } catch (err) {
            if (err instanceof UserPhoneExistsError) {
                return res.status(403).json({
                    message: err.message,
                })
            }

            if (err instanceof UserDocIdExistsError) {
                return res.status(403).json({
                    message: err.message,
                })
            }

            if (err instanceof UserIgUsernameExistsError) {
                return res.status(403).json({
                    message: err.message,
                })
            }

            if (err instanceof UserTiktokUsernameExistsError) {
                return res.status(403).json({
                    message: err.message,
                })
            }
            next(err)
        }
    }

    async getAll(req: Request, res: Response) {
        const data = await serviceContainer.user.getAll.run()

        const users = data.map((user) => user.toPrimitives())

        return res.status(200).json({
            data: users,
        })
    }

    async findById(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await serviceContainer.user.findById.run({
                id: req.params.id.toString(),
            })

            return res.status(200).json({
                data: user.toPrimitives(),
            })
        } catch (err) {
            if (err instanceof UserNotFoundError) {
                return res.status(404).json({ message: err.message })
            }

            next(err)
        }
    }
}
