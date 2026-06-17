import { Request, Response, NextFunction } from 'express'
import { serviceContainer } from '../../../../../shared/insfrastructure/services/serviceContainer'
import { generateUUID } from '../../../../../shared/insfrastructure/utils/generateUUID'
import {
    getPresignedUrl,
    uploadFile,
} from '@/lib/shared/insfrastructure/utils/s3'
import { appEventEmitter } from '@/lib/shared/insfrastructure/events/eventEmitter'
import logger from '@/lib/shared/insfrastructure/utils/logger'
import { ErrorHandler } from '@/lib/shared/domain/repository/error.repository'

export class EnrollmentController {
    constructor(private errorHandler: ErrorHandler) {}
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const {
                trainingId,
                userId,
                howFind,
                experience,
                additionalInfo,
                payRef,
                payImg,
            } = req.body

            if (
                !trainingId ||
                !userId ||
                !howFind ||
                !experience ||
                !payRef ||
                !payImg
            ) {
                res.status(400).json({
                    error: 'Missing fields',
                })
                return
            }
            const id = generateUUID()

            await serviceContainer.enrollment.create.run({
                id,
                isArrived: false,
                certificateReceived: false,
                payConfirmed: false,
                createdAt: new Date(),
                ...req.body,
            })

            appEventEmitter.emit('userRegisteredOnTraining', {
                userId: req.body.userId,
                trainingId: req.body.trainingId,
                configId: '465a827f-cd27-4896-a241-1b65ee25de35',
            })

            return res.status(201).send()
        } catch (err) {
            this.errorHandler.captureException(err)
            next(err)
        }
    }

    async getByTrainingId(req: Request, res: Response) {
        const enrollment =
            await serviceContainer.enrollment.getByTrainingId.run(
                req.params.id.toString()
            )

        return res.status(200).json({
            data: enrollment,
        })
    }

    async getAll(req: Request, res: Response) {
        const { slug, name } = req.query

        const enrollment = await serviceContainer.enrollment.getAll.run({
            filters: {
                name: name?.toString(),
                slug: slug?.toString(),
            },
        })

        return res.status(200).json({
            data: enrollment,
        })
    }

    async getById(req: Request, res: Response) {
        const { id } = req.params

        const enrollment = await serviceContainer.enrollment.getById.run(
            id.toString()
        )

        return res.status(200).json({ data: enrollment })
    }

    async uploadUserPay(req: Request, res: Response) {
        //@ts-ignore
        const { pay } = req.files
        const { folder } = req.body
        const { key } = await uploadFile(pay, `pays/${folder}`)

        res.status(200).json({
            path: key,
        })
    }

    async getUrl(req: Request, res: Response) {
        const { file } = req.body
        if (!file) {
            res.status(400).json({
                error: 'Missing fields',
            })
            return
        }

        const url = await getPresignedUrl({
            filename: file,
            expiresIn: 3600,
        })

        res.json({
            url,
        })
    }

    async updateIsArrived(req: Request, res: Response) {
        const { userId, trainingId } = req.params
        const { isArrived } = req.body

        await serviceContainer.enrollment.updateIsArrived.run({
            userId: userId.toString(),
            trainingId: trainingId.toString(),
            isArrived,
        })

        return res.status(201).send()
    }

    async updatePayConfirmed(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId, trainingId } = req.params
            const { payConfirmed } = req.body

            if (payConfirmed === undefined || payConfirmed === null) {
                return res
                    .status(400)
                    .json({ error: 'Missing payConfirmed field' })
            }

            const payConfirmedBool =
                typeof payConfirmed === 'string'
                    ? payConfirmed === 'true'
                    : Boolean(payConfirmed)

            await serviceContainer.enrollment.updatePayConfirmed.run({
                userId: userId.toString(),
                trainingId: trainingId.toString(),
                payConfirmed: payConfirmedBool,
            })

            if (payConfirmedBool) {
                appEventEmitter.emit('payConfirmed', {
                    userId: userId.toString(),
                    trainingId: trainingId.toString(),
                    configId: '465a827f-cd27-4896-a241-1b65ee25de35',
                })

                logger.info('payConfirmed event emitted', {
                    userId,
                    trainingId,
                })
            }

            return res.status(201).send()
        } catch (err) {
            logger.error('updatePayConfirmed error', { err })
            next(err)
        }
    }

    async updateCertificateReceived(req: Request, res: Response) {
        const { userId, trainingId } = req.params
        const { certificateReceived } = req.body

        await serviceContainer.enrollment.updateCertificateReceived.run({
            userId: userId.toString(),
            trainingId: trainingId.toString(),
            certificateReceived,
        })

        return res.status(201).send()
    }
}
