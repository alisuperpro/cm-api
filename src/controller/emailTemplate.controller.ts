import { Request, Response } from 'express'
import { EmailTemplateModel } from '../model/emailTemplate.model'

export class EmailTemplateController {
    static async create(req: Request, res: Response) {
        const { emailId, html, subject, active, title, slug } = req.body

        const [error, template] = await EmailTemplateModel.create({
            emailId,
            html,
            subject,
            active,
            title,
            slug,
        })

        if (error) {
            res.status(500).json({
                error: 'Error to create template',
            })
            return
        }

        res.json({
            data: template,
        })
    }

    static async all(req: Request, res: Response) {
        const { active, id } = req.query

        const [error, template] = await EmailTemplateModel.all({
            active: Boolean(active),
            id: id?.toString(),
        })

        if (error) {
            res.status(500).json({
                error: 'Error to get template',
            })
            return
        }

        res.json({
            data: template,
        })
    }
}
