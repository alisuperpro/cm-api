import { Request, Response } from 'express'
import { VideoUserModel } from '../model/videoUser.model'

export class VideoUserController {
    static async create(req: Request, res: Response) {
        const { userId, videoId } = req.body

        if (!userId || !videoId) {
            res.status(400).json({
                error: 'Missing fields',
            })
            return
        }

        const createdAt = new Date().getTime()

        const [error, result] = await VideoUserModel.create({
            userId,
            videoId,
            createdAt,
        })

        if (error) {
            res.status(500).json({
                error: 'Error to create db',
            })
            return
        }

        res.json({
            data: result,
        })
    }

    static async all(req: Request, res: Response) {
        const [error, result] = await VideoUserModel.all()

        if (error) {
            res.status(500).json({
                error: 'Error to get videos',
            })
            return
        }

        if (!result) {
            res.status(404).json({
                error: 'not found',
            })
            return
        }

        res.json({
            data: result,
        })
    }
}
