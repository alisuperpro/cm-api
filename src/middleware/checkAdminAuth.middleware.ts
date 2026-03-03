import { clerkClient, getAuth } from '@clerk/express'
import { NextFunction, Request, Response } from 'express'

export const checkAdminAuth = async (
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

    if (
        user.publicMetadata.role === 'Admin' ||
        user.publicMetadata.role === 'Protocol'
    ) {
        //@ts-ignore
        req.user = { ...user }
    } else {
        return res.status(401).json({ error: 'User not authenticated' })
    }
    next()
}
