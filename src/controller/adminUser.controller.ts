import { Request, Response } from 'express'
import { AdminUserModel } from '../model/adminUser.model'

export class AdminUserController {
    static async create(req: Request, res: Response) {
        const { id, role, name } = req.body

        if (!id || !role || !name) {
            res.status(400).json({
                error: 'Error missing fields',
            })
            return
        }

        const [error, admin] = await AdminUserModel.create({ id, role, name })

        if (error) {
            res.status(500).json({
                error: 'Error to create admin user',
            })
            return
        }

        res.json({
            data: admin,
        })
    }

    static async all(req: Request, res: Response) {
        const [error, admin] = await AdminUserModel.all()

        if (error) {
            res.status(500).json({
                error: 'Error to get admins',
            })
            return
        }

        if (!admin) {
            res.status(404).json({
                error: 'Not found',
            })
            return
        }

        res.json({
            data: admin,
        })
    }

    static async byId(req: Request, res: Response) {
        const { id } = req.params

        const [error, admin] = await AdminUserModel.byId({ id: id.toString() })

        if (error) {
            res.status(500).json({
                error: 'Error to get admin',
            })
            return
        }

        res.json({
            data: admin,
        })
    }

    static async updateNotificatonToken(req: Request, res: Response) {
        const { id } = req.params
        const { token } = req.body

        if (!token) {
            res.status(400).json({
                error: 'Error missing fields',
            })
        }

        const [error, admin] = await AdminUserModel.updateNotificatonToken({
            id: id.toString(),
            token,
        })

        if (error) {
            res.status(500).json({
                error: 'Error to update token',
            })
            return
        }

        res.json({
            data: admin,
        })
    }
}
