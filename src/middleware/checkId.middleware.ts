import { NextFunction, Request, Response } from 'express'

export const checkId = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params

    if (!id) {
        res.status(400).json({
            error: 'Error: missing id',
        })
        return
    }

    next()
}
