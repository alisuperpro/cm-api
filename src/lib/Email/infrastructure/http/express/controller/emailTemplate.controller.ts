import { NextFunction, Request, Response } from 'express'
import { serviceContainer } from '../../../../../shared/insfrastructure/services/serviceContainer'

export class EmailTemplateController {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            await serviceContainer.emailTemplate.create.run(req.body)

            return res.status(201).send()
        } catch (err) {
            next(err)
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const { slug, active } = req.params
            const template = await serviceContainer.emailTemplate.getAll.run({
                filters: {
                    slug: slug ? slug.toString() : undefined,
                    active: active
                        ? (JSON.parse(active.toString()) ?? false)
                        : undefined,
                },
            })

            return res.status(200).json({
                data: template,
            })
        } catch (err) {
            next(err)
        }
    }
}
