import * as Sentry from '@sentry/node'
import { ErrorHandler } from '../../domain/repository/error.repository'
import dotenv from 'dotenv'

dotenv.config({
    quiet: true,
})
export class SentryErrorHandler implements ErrorHandler {
    constructor() {
        if (process.env.SENTRY_DSN) {
            Sentry.init({
                dsn: process.env.SENTRY_DSN,
                environment: process.env.NODE_ENV || 'development',
                // Otras configuraciones que necesites
            })
        }
    }

    captureException(
        error: Error | unknown,
        contexts?: Record<string, any>
    ): void {
        Sentry.captureException(error, { extra: contexts })
    }

    captureMessage(message: string): void {
        Sentry.captureMessage(message)
    }
}
