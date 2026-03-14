import { Request } from 'express'

export interface FileUploadOptions {
    basePath?: string
    includeMetadata?: boolean
    customUrlBuilder?: (req: Request, filename: string) => string
}

export interface FileUploadResponse {
    path: string
    filename: string
    [key: string]: any // Para metadatos adicionales
}
