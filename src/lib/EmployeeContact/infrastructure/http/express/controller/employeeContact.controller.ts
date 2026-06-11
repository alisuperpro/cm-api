import { EmployeeContactNotFoundError } from '@/lib/EmployeeContact/domain/errors/employeeContactNotFoundError.error'
import { serviceContainer } from '@/lib/shared/insfrastructure/services/serviceContainer'
import { generateUUID } from '@/lib/shared/insfrastructure/utils/generateUUID'
import { NextFunction, Request, Response } from 'express'

export class EmployeeContactController {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const data = {
                ...req.body,
                id: generateUUID(),
            }
            await serviceContainer.employeeContact.create.run(data)

            return res.status(201).send()
        } catch (err) {
            next(err)
        }
    }

    async findByEmployeeId(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params

            const result =
                await serviceContainer.employeeContact.findByEmployeeId.run(
                    id.toString()
                )

            const contacts = result?.map((contact) => contact.toPrimitives())

            return res.status(200).json({
                data: contacts,
            })
        } catch (err) {
            if (err instanceof EmployeeContactNotFoundError) {
                return res.status(404).json({
                    message: err.message,
                })
            }
            next(err)
        }
    }
}
