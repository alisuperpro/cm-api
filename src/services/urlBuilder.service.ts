import { Request } from 'express'

export class UrlBuilderService {
    private static instance: UrlBuilderService

    private constructor() {}

    static getInstance(): UrlBuilderService {
        if (!UrlBuilderService.instance) {
            UrlBuilderService.instance = new UrlBuilderService()
        }
        return UrlBuilderService.instance
    }

    buildUrl(req: Request, filename: string, basePath: string = ''): string {
        const isProduction = process.env.NODE_ENV === 'production'
        const port = process.env.PORT || 3500
        const baseUrl = this.getBaseUrl(req, isProduction, port)

        // Construir path completo
        const fullPath = basePath
            ? `/${basePath}/${filename}`.replace(/\/+/g, '/')
            : `/${filename}`

        return `${baseUrl}${fullPath}`
    }

    private getBaseUrl(
        req: Request,
        isProduction: boolean,
        port: string | number
    ): string {
        if (isProduction) {
            return `https://${req.hostname}`
        }
        return `${req.protocol}://${req.hostname}:${port}`
    }

    // Método personalizable para casos especiales
    buildCustomUrl(req: Request, filename: string, customPath: string): string {
        const baseUrl = this.getBaseUrl(
            req,
            process.env.NODE_ENV === 'production',
            process.env.PORT || 3500
        )
        return `${baseUrl}${customPath.startsWith('/') ? '' : '/'}${customPath}`.replace(
            /\/+/g,
            '/'
        )
    }
}
