import { NextFunction, Request, Response } from 'express'
import { ErrorHandler } from '@/lib/shared/domain/repository/error.repository'
import { SentryErrorHandler } from '../../monitoring/sentryHandler'

const errorHandler = new SentryErrorHandler()
const createCheckId = (errorHandler: ErrorHandler) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params

        if (!id) {
            errorHandler.captureException(new Error('Error: missing id'), {
                path: req.originalUrl,
            })
            return res.status(400).json({
                error: 'Error: missing id',
            })
        }

        next()
    }
}

export const checkId = createCheckId(errorHandler)
