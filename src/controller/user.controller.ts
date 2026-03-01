import { Request, Response } from 'express'
import { UserModel } from '../model/user.model'

export class UserController {
    static async create(req: Request, res: Response) {
        const {
            id,
            fullName,
            docId,
            email,
            phone,
            birthday,
            occupationStatus,
            university,
            howFindUs,
            disability,
            igUsername,
        } = req.body

        console.log({
            body: req.body,
        })
        if (
            !id ||
            !fullName ||
            !docId ||
            !email ||
            !phone ||
            !howFindUs ||
            !birthday ||
            !disability ||
            !occupationStatus ||
            !university ||
            !igUsername
        ) {
            res.status(400).json({
                error: 'Missing data',
            })
            return
        }

        const [error, user] = await UserModel.create({
            id,
            fullName,
            docId,
            email,
            phone,
            birthday,
            occupationStatus,
            university,
            howFindUs,
            disability,
            igUsername,
        })

        if (error) {
            console.log(error)
            res.status(500).json({
                error: 'Error to create user',
            })

            return
        }

        res.json({
            data: user,
        })
    }
    static async updateInfo(req: Request, res: Response) {
        res.json({
            message: 'created',
        })
    }

    static async me(req: Request, res: Response) {}
}
