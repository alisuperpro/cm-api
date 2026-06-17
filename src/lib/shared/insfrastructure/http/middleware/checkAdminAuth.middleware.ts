import { clerkClient, getAuth } from '@clerk/express'
import { NextFunction, Request, Response } from 'express'
import { SentryErrorHandler } from '../../monitoring/sentryHandler'
import { ErrorHandler } from '@/lib/shared/domain/repository/error.repository'

const errorHandler = new SentryErrorHandler()

const createCheckAdminAuthMiddleware = (errorHandler: ErrorHandler) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const { isAuthenticated, userId } = getAuth(req)

        if (!isAuthenticated) {
            errorHandler.captureException(
                new Error('Employee not authenticated'),
                {
                    path: req.originalUrl,
                }
            )
            return res.status(401).json({ error: 'Employee not authenticated' })
        }

        const user = await clerkClient.users.getUser(userId)

        if (user.publicMetadata.role === 'Admin') {
            //@ts-ignore
            req.user = { ...user }
        } else {
            return res.status(401).json({ error: 'User not employee' })
        }
        next()
    }
}

export const checkAdminAuth = createCheckAdminAuthMiddleware(errorHandler)
