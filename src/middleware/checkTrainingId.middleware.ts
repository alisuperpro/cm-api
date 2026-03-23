import { NextFunction, Request, Response } from 'express'

export const checkTrainingId = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { trainingId } = req.params

    if (!trainingId) {
        res.status(400).json({
            error: 'Error: missing trainingId',
        })
        return
    }

    next()
}
