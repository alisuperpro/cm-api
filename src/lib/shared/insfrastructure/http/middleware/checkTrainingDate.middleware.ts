import { NextFunction, Request, Response } from 'express'
import { hasDatePassed } from '../../utils/hasDatePassed'
import { serviceContainer } from '../../services/serviceContainer'

export const checkTrainingDate = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { trainingId } = req.params

    const training = await serviceContainer.training.findById.run(
        trainingId.toString()
    )

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
