import { NextFunction, Request, Response } from 'express'
import { hasDatePassed } from '../../utils/hasDatePassed'
import { TrainingModel } from '../../../../../model/training.model'

export const checkTrainingDate = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { trainingId } = req.params

    const [error, training] = await TrainingModel.byId({
        id: trainingId.toString(),
    })

    if (error) {
        res.status(500).json({
            error: 'Error to get training',
        })
        return
    }

    if (!training) {
        res.status(404).json({
            error: 'not found',
        })
        return
    }

    //@ts-ignore
    const isDatePassed = hasDatePassed(training.date)

    if (isDatePassed) {
        res.status(403).json({
            error: 'Error date passed',
        })
        return
    }

    next()
}
