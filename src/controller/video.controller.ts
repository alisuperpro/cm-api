import { Request, Response } from 'express'
import { VideoModel } from '../model/video.model'

export class VideoController {
    static async create(req: Request, res: Response) {
        const {
            title,
            description,
            url,
            thumbnailUrl,
            duration,
            categoryId,
            visibilityId,
            featured,
            views,
            slug,
        } = req.body

        if (!title || !url || !categoryId || !visibilityId || !slug) {
            res.status(400).json({
                error: 'Missing fields',
            })
            return
        }

        const now = new Date().getTime()

        const [error, video] = await VideoModel.create({
            title,
            description,
            url,
            thumbnailUrl,
            duration,
            categoryId,
            visibilityId,
            featured,
            views,
            slug,
            createdAt: now,
            updatedAt: now,
        })

        if (error) {
            res.status(500).json({
                error: 'Error to create video record',
            })
            return
        }

        res.json({
            data: video,
        })
    }

    static async all(req: Request, res: Response) {
        const [error, video] = await VideoModel.all()

        if (error) {
            res.status(500).json({
                error: 'Error to get videos',
            })
            return
        }

        if (!video) {
            res.status(404).json({
                error: 'Not found',
            })
            return
        }

        res.json({
            data: video,
        })
    }
}
