import { clerkClient, getAuth } from '@clerk/express'
import { NextFunction, Request, Response } from 'express'
import { ErrorHandler } from '../../../domain/repository/error.repository'
import { SentryErrorHandler } from '../../monitoring/sentryHandler'

const errorHandler = new SentryErrorHandler()

const createCheckAuthMiddleware = (errorHandler: ErrorHandler) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { isAuthenticated, userId } = getAuth(req)

            if (!isAuthenticated) {
                errorHandler.captureException(
                    new Error('User not authenticated'),
                    { path: req.originalUrl }
                )

                return res.status(401).json({ error: 'User not authenticated' })
            }

            const user = await clerkClient.users.getUser(userId)

            //@ts-ignore
            req.user = { ...user }
            next()
        } catch (error) {
            errorHandler.captureException(error, {
                context: 'Clerk User Fetch',
            })
            return res.status(500).json({ error: 'Internal server error' })
        }
    }
}

export const checkAuth = createCheckAuthMiddleware(errorHandler)
