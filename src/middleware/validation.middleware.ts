import { Request, Response, NextFunction } from 'express'

export const validateFileType = (allowedTypes: string[]) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        if (!req.file) {
            next()
            return
        }

        if (!allowedTypes.includes(req.file.mimetype)) {
            res.status(400).json({
                error: 'Invalid file type',
                allowedTypes,
                received: req.file.mimetype,
            })
            return
        }

        next()
    }
}

export const validateFileSize = (maxSizeInBytes: number) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        if (!req.file) {
            next()
            return
        }

        if (req.file.size > maxSizeInBytes) {
            res.status(400).json({
                error: 'File too large',
                maxSize: maxSizeInBytes,
                received: req.file.size,
            })
            return
        }

        next()
    }
}
