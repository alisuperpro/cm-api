import { NextFunction, Request, Response } from 'express'
import { serviceContainer } from '@/lib/shared/insfrastructure/services/serviceContainer'
import { EmployeeNotFoundError } from '@/lib/Employee/domain/errors/employeeNotFoundError.error'

export class EmployeeController {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            await serviceContainer.employee.create.run(req.body)

            return res.status(201).send()
        } catch (err) {
            next(err)
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const employees = await serviceContainer.employee.getAll.run()

            return res.status(200).json({
                data: employees,
            })
        } catch (err) {
            next(err)
        }
    }

    async findById(req: Request, res: Response, next: NextFunction) {
        try {
            const employee = await serviceContainer.employee.findById.run(
                req.params.id.toString()
            )

            return res.status(200).json({
                data: employee.toPrimitives(),
            })
        } catch (err) {
            if (err instanceof EmployeeNotFoundError) {
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
            await serviceContainer.employee.updateNotificationToken.run({
                id: req.params.id.toString(),
                token: req.body.token,
            })

            return res.status(201).send()
        } catch (err) {
            next(err)
        }
    }
}
