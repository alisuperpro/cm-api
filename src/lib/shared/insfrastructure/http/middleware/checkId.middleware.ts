import '@/lib/shared/insfrastructure/utils/instrument.mjs'
import { NextFunction, Request, Response } from 'express'
import * as Sentry from '@sentry/node'

export const checkId = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params

    if (!id) {
        Sentry.captureException(new Error('Error: missing id'))
        return res.status(400).json({
            error: 'Error: missing id',
        })
    }

    next()
}
