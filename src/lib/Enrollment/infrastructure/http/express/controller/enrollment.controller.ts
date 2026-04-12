import { Request, Response } from 'express'
import { serviceContainer } from '../../../../../shared/insfrastructure/services/serviceContainer'
import { generateUUID } from '../../../../../shared/insfrastructure/utils/generateUUID'
import { getPresignedUrl, uploadFile } from '../../../../../../services/s3'

export class EnrollmentController {
    async create(req: Request, res: Response) {
        const id = generateUUID()

        await serviceContainer.enrollment.create.run({ id, ...req.body })

        return res.status(201).send()
    }

    async getByTrainingId(req: Request, res: Response) {
        const enrollment = await serviceContainer.enrollment.getByTraining.run(
            req.params.id.toString()
        )

        return res.status(200).json({
            data: enrollment,
        })
    }

    async getAll(req: Request, res: Response) {
        const enrollment = await serviceContainer.enrollment.getAll.run()

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

    async updatePayConfirmed(req: Request, res: Response) {
        const { userId, trainingId } = req.params
        const { payConfirmed } = req.body

        await serviceContainer.enrollment.updatePayConfirmed.run({
            userId: userId.toString(),
            trainingId: trainingId.toString(),
            payConfirmed,
        })

        return res.status(201).send()
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
