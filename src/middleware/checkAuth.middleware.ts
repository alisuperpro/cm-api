import { clerkClient, getAuth } from '@clerk/express'
import { NextFunction, Request, Response } from 'express'

export const checkAuth = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.log('checking if session exists')
    const { isAuthenticated, userId } = getAuth(req)

    if (!isAuthenticated) {
        return res.status(401).json({ error: 'User not authenticated' })
    }

    const user = await clerkClient.users.getUser(userId)

    //@ts-ignore
    req.user = { ...user }
    next()
}
