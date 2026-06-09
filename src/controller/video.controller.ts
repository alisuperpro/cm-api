/* import { Request, Response } from 'express'
import { VideoModel } from '../model/video.model'
import { getPresignedUrl, uploadFile } from '../services/s3'

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

    static async uploadVideo(req: Request, res: Response) {
        //@ts-ignore
        const { video } = req.files
        //const { folder } = req.body
        const { key } = await uploadFile(video, `video`)

        res.json({
            path: key,
        })
    }

    static async uploadThumbnail(req: Request, res: Response) {
        //@ts-ignore
        const { thumbnail } = req.files
        const { key } = await uploadFile(thumbnail, `thumbnail`)

        res.json({
            path: key,
        })
    }

    static async getUrl(req: Request, res: Response) {
        const { file } = req.body

        if (!file) {
            res.status(400).json({
                error: 'Missing fields',
            })
            return
        }

        const url = await getPresignedUrl({
            filename: file,
            expiresIn: 3600 * 24,
        })

        res.json({
            url,
        })
    }

    static async bySlug(req: Request, res: Response) {
        const { slug } = req.params

        if (!slug) {
            res.status(400).json({
                error: 'Missing fields',
            })
            return
        }

        const [error, video] = await VideoModel.bySlug({
            slug: slug.toString(),
        })

        if (error) {
            res.status(500).json({
                error: 'Error to get video by slug',
            })
            return
        }

        res.json({
            data: video,
        })
    }
}
 */
