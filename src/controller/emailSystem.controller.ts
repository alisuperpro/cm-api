import { Request, Response } from 'express'
import { EmailSystemModel } from '../model/emailSystem.model'
import { encrypt } from '../utils/crypto'

export class EmailSystemController {
    static async create(req: Request, res: Response) {
        const { email, name, password, host, port, active } = req.body

        if (!email || !name || !password || !host || !port || !active) {
            res.status(400).json({
                error: 'Missing fields',
            })
            return
        }

        const hash = encrypt(password)

        const [error, emailSystem] = await EmailSystemModel.create({
            email,
            name,
            password: hash,
            host,
            port,
            active,
        })

        if (error) {
            res.status(500).json({
                error: 'Error to save email',
            })
            return
        }

        res.json({
            data: emailSystem,
        })
    }

    static async all(req: Request, res: Response) {
        const { active, id } = req.query

        const [error, emailSystem] = await EmailSystemModel.all({
            active: Boolean(active),
            id: id?.toString(),
        })

        if (error) {
            res.status(500).json({
                error: 'Error to get emails',
            })
            return
        }

        res.json({
            data: emailSystem,
        })
    }
}
