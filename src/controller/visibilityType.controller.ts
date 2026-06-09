/* import { Request, Response } from 'express'
import { VisibilityTypeModel } from '../model/visibilityType.model'

export class VisibilityTypeController {
    static async create(req: Request, res: Response) {
        const { name, description } = req.body

        if (!name) {
            res.status(400).json({
                error: 'Missing name',
            })
            return
        }

        const [error, visibility] = await VisibilityTypeModel.create({
            name,
            description,
        })

        if (error) {
            res.status(500).json({
                error: 'Error to save visibility type',
            })
            return
        }

        res.json({
            data: visibility,
        })
    }

    static async all(req: Request, res: Response) {
        const [error, visibility] = await VisibilityTypeModel.all()

        if (error) {
            res.status(500).json({
                error: 'Error to get visibility types',
            })
            return
        }

        if (!visibility) {
            res.status(404).json({
                error: 'Not found',
            })
            return
        }

        res.json({
            data: visibility,
        })
    }
}
 */
