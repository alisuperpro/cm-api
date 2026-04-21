import {
    mockTrainingStatusCreate,
    mockTrainingStatusGetAll,
    makeMockResponse,
    makeRequest,
} from './helpers/mockServiceContainer'
import { STATUS_ROW, STATUS_PRIMITIVES } from './helpers/fixtures'

import { Response } from 'express'
import { TrainingStatusController } from '@/lib/Training/infrastructure/http/express/controller/trainingStatus.controller'

describe('TrainingStatusController', () => {
    let controller: TrainingStatusController

    beforeEach(() => {
        jest.clearAllMocks()
        controller = new TrainingStatusController()
    })

    describe('create()', () => {
        it('should call serviceContainer.trainingStatus.create with req.body', async () => {
            mockTrainingStatusCreate.mockResolvedValue(undefined)
            const req = makeRequest({ body: { status: 'active' } })
            const res = makeMockResponse()

            await controller.create(req, res as Response)

            expect(mockTrainingStatusCreate).toHaveBeenCalledTimes(1)
            expect(mockTrainingStatusCreate).toHaveBeenCalledWith(req.body)
        })

        it('should return 201 with no body', async () => {
            mockTrainingStatusCreate.mockResolvedValue(undefined)
            const res = makeMockResponse()

            await controller.create(makeRequest(), res as Response)

            expect(res.status).toHaveBeenCalledWith(201)
            expect(res.send).toHaveBeenCalled()
        })

        it('should propagate errors from the use case', async () => {
            mockTrainingStatusCreate.mockRejectedValue(new Error('Validation failed'))
            const res = makeMockResponse()

            await expect(
                controller.create(makeRequest(), res as Response)
            ).rejects.toThrow('Validation failed')
        })
    })

    describe('getAll()', () => {
        it('should return 200 with mapped primitives', async () => {
            const mockStatus = { toPrimitives: () => STATUS_PRIMITIVES }
            mockTrainingStatusGetAll.mockResolvedValue([mockStatus])
            const res = makeMockResponse()

            await controller.getAll(makeRequest(), res as Response)

            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledWith({ data: [STATUS_PRIMITIVES] })
        })

        it('should return 200 with empty data array when no statuses exist', async () => {
            mockTrainingStatusGetAll.mockResolvedValue([])
            const res = makeMockResponse()

            await controller.getAll(makeRequest(), res as Response)

            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledWith({ data: [] })
        })

        it('should call toPrimitives on every status', async () => {
            const toPrimitives = jest.fn().mockReturnValue(STATUS_PRIMITIVES)
            mockTrainingStatusGetAll.mockResolvedValue([
                { toPrimitives },
                { toPrimitives },
            ])
            const res = makeMockResponse()

            await controller.getAll(makeRequest(), res as Response)

            expect(toPrimitives).toHaveBeenCalledTimes(2)
        })

        it('should propagate errors from the use case', async () => {
            mockTrainingStatusGetAll.mockRejectedValue(new Error('DB error'))
            const res = makeMockResponse()

            await expect(
                controller.getAll(makeRequest(), res as Response)
            ).rejects.toThrow('DB error')
        })
    })
})
