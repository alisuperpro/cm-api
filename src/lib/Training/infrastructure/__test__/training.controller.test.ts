import {
    mockTrainingCreate,
    mockTrainingGetAll,
    mockTrainingFindById,
    makeMockResponse,
    makeRequest,
} from './helpers/mockServiceContainer'
import { TRAINING_ROW, TRAINING_PRIMITIVES } from './helpers/fixtures'

import { Request, Response } from 'express'
import { TrainingController } from '@/lib/Training/infrastructure/http/express/controller/training.controller'
import { TrainingNotFoundError } from '@/lib/Training/domain/error/trainingNotFoundError.error'

describe('TrainingController', () => {
    let controller: TrainingController

    beforeEach(() => {
        jest.clearAllMocks()
        controller = new TrainingController()
    })

    describe('create()', () => {
        it('should call serviceContainer.training.create with req.body', async () => {
            mockTrainingCreate.mockResolvedValue(undefined)
            const req = makeRequest({ body: { title: 'Test Training' } })
            const res = makeMockResponse()

            await controller.create(req, res as Response)

            expect(mockTrainingCreate).toHaveBeenCalledTimes(1)
            expect(mockTrainingCreate).toHaveBeenCalledWith(req.body)
        })

        it('should return 201 with no body', async () => {
            mockTrainingCreate.mockResolvedValue(undefined)
            const res = makeMockResponse()

            await controller.create(makeRequest(), res as Response)

            expect(res.status).toHaveBeenCalledWith(201)
            expect(res.send).toHaveBeenCalled()
        })

        it('should propagate errors from the use case', async () => {
            mockTrainingCreate.mockRejectedValue(new Error('Validation failed'))
            const res = makeMockResponse()

            await expect(
                controller.create(makeRequest(), res as Response)
            ).rejects.toThrow('Validation failed')
        })
    })

    describe('getAll()', () => {
        it('should return 200 with mapped primitives', async () => {
            const mockTraining = { toPrimitives: () => TRAINING_PRIMITIVES }
            mockTrainingGetAll.mockResolvedValue([mockTraining])
            const res = makeMockResponse()

            await controller.getAll(makeRequest(), res as Response)

            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledWith({ data: [TRAINING_PRIMITIVES] })
        })

        it('should return 200 with empty data array when no trainings exist', async () => {
            mockTrainingGetAll.mockResolvedValue([])
            const res = makeMockResponse()

            await controller.getAll(makeRequest(), res as Response)

            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledWith({ data: [] })
        })

        it('should call toPrimitives on every training', async () => {
            const toPrimitives = jest.fn().mockReturnValue(TRAINING_PRIMITIVES)
            mockTrainingGetAll.mockResolvedValue([
                { toPrimitives },
                { toPrimitives },
            ])
            const res = makeMockResponse()

            await controller.getAll(makeRequest(), res as Response)

            expect(toPrimitives).toHaveBeenCalledTimes(2)
        })

        it('should propagate errors from the use case', async () => {
            mockTrainingGetAll.mockRejectedValue(new Error('DB error'))
            const res = makeMockResponse()

            await expect(
                controller.getAll(makeRequest(), res as Response)
            ).rejects.toThrow('DB error')
        })
    })

    describe('findById()', () => {
        it('should return 200 with training primitives when found', async () => {
            const mockTraining = { toPrimitives: () => TRAINING_PRIMITIVES }
            mockTrainingFindById.mockResolvedValue(mockTraining)
            const req = makeRequest({ params: { id: TRAINING_ROW.id } })
            const res = makeMockResponse()

            await controller.findById(req, res as Response)

            expect(mockTrainingFindById).toHaveBeenCalledWith(TRAINING_ROW.id)
            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledWith({ data: TRAINING_PRIMITIVES })
        })

        it('should return 404 with message when TrainingNotFoundError is thrown', async () => {
            mockTrainingFindById.mockRejectedValue(
                new TrainingNotFoundError('Training not found')
            )
            const req = makeRequest({ params: { id: 'non-existent' } })
            const res = makeMockResponse()

            await controller.findById(req, res as Response)

            expect(res.status).toHaveBeenCalledWith(404)
            expect(res.json).toHaveBeenCalledWith({ message: 'Training not found' })
        })

        it('should rethrow errors that are not TrainingNotFoundError', async () => {
            mockTrainingFindById.mockRejectedValue(new Error('Unexpected error'))
            const req = makeRequest({ params: { id: TRAINING_ROW.id } })
            const res = makeMockResponse()

            await expect(
                controller.findById(req, res as Response)
            ).rejects.toThrow('Unexpected error')
        })
    })

    describe('getUrl()', () => {
        it('should return 400 when file field is missing', async () => {
            const req = makeRequest({ body: {} })
            const res = makeMockResponse()

            await controller.getUrl(req, res as Response)

            expect(res.status).toHaveBeenCalledWith(400)
            expect(res.json).toHaveBeenCalledWith({ error: 'Missing fields' })
        })
    })
})
