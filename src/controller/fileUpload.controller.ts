import { Request, Response, NextFunction } from 'express'
import { UrlBuilderService } from '../services/urlBuilder.service'
import {
    FileUploadOptions,
    FileRequest,
    FileUploadResponse,
} from '../types/file.types'

export class FileUploadController {
    private urlBuilder: UrlBuilderService

    constructor() {
        this.urlBuilder = UrlBuilderService.getInstance()
    }

    /**
     * Middleware factory para manejar la subida de archivos
     * @param options Opciones de configuración
     * @returns Express middleware function
     */
    handleUpload(options: FileUploadOptions = {}) {
        return (req: Request, res: Response, next: NextFunction): void => {
            try {
                // Validar archivo
                if (!this.validateFile(req)) {
                    res.status(400).json({
                        error: 'No file uploaded or invalid file format',
                    })
                    return
                }

                const file = req.file!
                const response = this.buildResponse(req, file, options)

                res.status(200).json(response)
            } catch (error) {
                next(error)
            }
        }
    }

    /**
     * Maneja múltiples archivos
     */
    handleMultipleUpload(options: FileUploadOptions = {}) {
        return (req: FileRequest, res: Response, next: NextFunction): void => {
            try {
                if (
                    !req.files ||
                    !Array.isArray(req.files) ||
                    req.files.length === 0
                ) {
                    res.status(400).json({
                        error: 'No files uploaded',
                    })
                    return
                }

                const files = req.files as Express.Multer.File[]
                const responses = files.map((file) =>
                    this.buildResponse(req, file, options)
                )

                res.status(200).json({
                    files: responses,
                    count: responses.length,
                })
            } catch (error) {
                next(error)
            }
        }
    }

    /**
     * Construye la respuesta para un archivo
     */
    private buildResponse(
        req: Request,
        file: Express.Multer.File,
        options: FileUploadOptions
    ): FileUploadResponse {
        const {
            basePath = 'uploads',
            includeMetadata = true,
            customUrlBuilder,
        } = options

        // Construir URL (personalizada o por defecto)
        const fileUrl = customUrlBuilder
            ? customUrlBuilder(req, file.filename)
            : this.urlBuilder.buildUrl(req, file.filename, basePath)

        // Respuesta base
        const response: FileUploadResponse = {
            path: fileUrl,
            filename: file.filename,
        }

        // Incluir metadatos si se solicitan
        if (includeMetadata) {
            response.metadata = {
                size: file.size,
                mimetype: file.mimetype,
                originalName: file.originalname,
                encoding: file.encoding,
                destination: file.destination,
                uploadedAt: new Date().toISOString(),
            }
        }

        return response
    }

    /**
     * Valida que exista un archivo
     */
    private validateFile(req: Request): boolean {
        return !!(req.file && req.file.filename)
    }

    // Métodos estáticos para uso rápido
    static single(basePath?: string) {
        const controller = new FileUploadController()
        return controller.handleUpload({ basePath })
    }

    static multiple(basePath?: string) {
        const controller = new FileUploadController()
        return controller.handleMultipleUpload({ basePath })
    }
}

// Exportar instancia por defecto
export default new FileUploadController()
