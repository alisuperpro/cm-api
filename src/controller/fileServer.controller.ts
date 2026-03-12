import { Request, Response, NextFunction } from 'express'
import path from 'path'
import fs from 'fs'

export interface FileServeOptions {
    directory: string
    headers?: Record<string, string | number>
    dotfiles?: 'allow' | 'deny' | 'ignore'
    acceptRanges?: boolean
    cacheControl?: boolean
    maxAge?: number
    immutable?: boolean
}

export class FileServeController {
    private static instance: FileServeController
    private defaultOptions: Partial<FileServeOptions> = {
        dotfiles: 'deny',
        acceptRanges: true,
        cacheControl: true,
        maxAge: 86400000, // 24 horas
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': 0,
        },
    }

    private constructor() {}

    static getInstance(): FileServeController {
        if (!FileServeController.instance) {
            FileServeController.instance = new FileServeController()
        }
        return FileServeController.instance
    }

    /**
     * Crea un middleware para servir archivos estáticos
     */
    serveFile(options: FileServeOptions) {
        const config = { ...this.defaultOptions, ...options }

        return (req: Request, res: Response, next: NextFunction): void => {
            try {
                const filename = req.params.name

                // Validar nombre de archivo (prevenir path traversal)
                if (!this.isValidFilename(filename.toString())) {
                    res.status(400).json({ error: 'Invalid filename' })
                    return
                }

                const filePath = path.join(
                    config.directory,
                    filename.toString()
                )

                // Verificar que el archivo existe y está dentro del directorio permitido
                if (!this.isFileSafe(filePath, config.directory)) {
                    res.status(404).json({ error: 'File not found' })
                    return
                }

                const sendOptions = {
                    root: config.directory,
                    dotfiles: config.dotfiles,
                    headers: config.headers,
                    acceptRanges: config.acceptRanges,
                    cacheControl: config.cacheControl,
                    maxAge: config.maxAge,
                    immutable: config.immutable,
                }

                res.sendFile(filename.toString(), sendOptions, (err) => {
                    if (err) {
                        this.handleError(err, res, next)
                    } else {
                        this.logAccess(req, filename.toString())
                    }
                })
            } catch (error) {
                next(error)
            }
        }
    }

    /**
     * Sirve archivos con soporte para streaming (útil para videos)
     */
    serveStream(options: FileServeOptions) {
        const config = { ...this.defaultOptions, ...options }

        return (req: Request, res: Response, next: NextFunction): void => {
            try {
                const filename = req.params.name

                if (!this.isValidFilename(filename.toString())) {
                    res.status(400).json({ error: 'Invalid filename' })
                    return
                }

                const filePath = path.join(
                    config.directory,
                    filename.toString()
                )

                if (!this.isFileSafe(filePath, config.directory)) {
                    res.status(404).json({ error: 'File not found' })
                    return
                }

                // Obtener estadísticas del archivo
                fs.stat(filePath, (err, stats) => {
                    if (err) {
                        next(err)
                        return
                    }

                    const range = req.headers.range

                    if (range) {
                        // Streaming con soporte para ranges (útil para videos)
                        this.streamWithRange(req, res, filePath, stats)
                    } else {
                        // Envío normal
                        res.sendFile(
                            filename.toString(),
                            {
                                root: config.directory,
                                headers: config.headers,
                            },
                            (sendErr) => {
                                if (sendErr)
                                    this.handleError(sendErr, res, next)
                            }
                        )
                    }
                })
            } catch (error) {
                next(error)
            }
        }
    }

    /**
     * Streaming con soporte para ranges (para videos)
     */
    private streamWithRange(
        req: Request,
        res: Response,
        filePath: string,
        stats: fs.Stats
    ): void {
        const range = req.headers.range
        const fileSize = stats.size

        if (!range) {
            res.status(400).json({ error: 'Requires Range header' })
            return
        }

        const CHUNK_SIZE = 10 ** 6 // 1MB
        const start = Number(range.replace(/\D/g, ''))
        const end = Math.min(start + CHUNK_SIZE, fileSize - 1)

        const contentLength = end - start + 1
        const headers = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': contentLength,
            'Content-Type': this.getContentType(filePath),
        }

        res.writeHead(206, headers)

        const stream = fs.createReadStream(filePath, { start, end })
        stream.pipe(res)

        stream.on('error', (error) => {
            console.error('Stream error:', error)
            res.end()
        })
    }

    /**
     * Valida que el nombre del archivo no intente hacer path traversal
     */
    private isValidFilename(filename: string): boolean {
        // Prevenir ataques de path traversal
        const normalized = path
            .normalize(filename)
            .replace(/^(\.\.(\/|\\|$))+/, '')
        return (
            !filename.includes('..') &&
            !filename.includes('/') &&
            !filename.includes('\\') &&
            normalized === filename
        )
    }

    /**
     * Verifica que el archivo esté dentro del directorio permitido
     */
    private isFileSafe(filePath: string, baseDir: string): boolean {
        try {
            const resolvedPath = fs.realpathSync(filePath)
            const resolvedBase = fs.realpathSync(baseDir)
            return (
                resolvedPath.startsWith(resolvedBase) && fs.existsSync(filePath)
            )
        } catch {
            return false
        }
    }

    /**
     * Maneja errores de sendFile
     */
    private handleError(err: any, res: Response, next: NextFunction): void {
        if (err.status === 404) {
            res.status(404).json({ error: 'File not found' })
        } else {
            next(err)
        }
    }

    /**
     * Log de acceso a archivos
     */
    private logAccess(req: Request, filename: string): void {
        if (process.env.NODE_ENV !== 'production') {
            console.log(
                `📁 File served: ${filename} - ${req.method} ${req.url}`
            )
        }
    }

    /**
     * Obtiene el content type basado en la extensión
     */
    private getContentType(filePath: string): string {
        const ext = path.extname(filePath).toLowerCase()
        const types: Record<string, string> = {
            '.mp4': 'video/mp4',
            '.webm': 'video/webm',
            '.ogg': 'video/ogg',
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.png': 'image/png',
            '.gif': 'image/gif',
            '.pdf': 'application/pdf',
        }
        return types[ext] || 'application/octet-stream'
    }

    // Métodos estáticos para uso rápido
    static file(directory: string) {
        return FileServeController.getInstance().serveFile({ directory })
    }

    static stream(directory: string) {
        return FileServeController.getInstance().serveStream({ directory })
    }
}

export default FileServeController.getInstance()
