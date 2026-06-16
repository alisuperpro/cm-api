export interface ErrorHandler {
    captureException(
        error: Error | unknown,
        contexts?: Record<string, any>
    ): void
    captureMessage(message: string): void
}
