import { Request, Response } from 'express'
import { VideoCategoryModel } from '../model/videoCategory.model'

export class VideoCategoryController {
    static async create(req: Request, res: Response) {
        const { name, description, slug } = req.body

        if (!name || !slug) {
            res.status(400).json({
                error: 'Missing field',
            })
            return
        }
        const now = new Date().getTime()
        const [error, category] = await VideoCategoryModel.create({
            name,
            description,
            slug,
            createdAt: now,
        })

        if (error) {
            res.status(500).json({
                error: 'Error to create video category',
            })
            return
        }

        res.json({
            data: category,
        })
    }

    static async all(req: Request, res: Response) {
        const [error, category] = await VideoCategoryModel.all()

        if (error) {
            res.status(500).json({
                error: 'Error to get video category',
            })
            return
        }

        res.json({
            data: category,
        })
    }
}
