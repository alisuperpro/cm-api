import {
    mockTrainingTypeCreate,
    mockTrainingTypeGetAll,
    makeMockResponse,
    makeRequest,
} from './helpers/mockServiceContainer'
import { TYPE_ROW, TYPE_PRIMITIVES } from './helpers/fixtures'

import { Response, NextFunction } from 'express'
import { TrainingTypeController } from '@/lib/Training/infrastructure/http/express/controller/trainingType.controller'

describe('TrainingTypeController', () => {
    let controller: TrainingTypeController

    beforeEach(() => {
        jest.clearAllMocks()
        controller = new TrainingTypeController()
    })

    describe('create()', () => {
        it('should call serviceContainer.trainingType.create with req.body', async () => {
            mockTrainingTypeCreate.mockResolvedValue(undefined)
            const req = makeRequest({ body: { type: 'workshop', slug: 'workshop' } })
            const res = makeMockResponse()
            const next = jest.fn()

            await controller.create(req, res as Response, next)

            expect(mockTrainingTypeCreate).toHaveBeenCalledTimes(1)
            expect(mockTrainingTypeCreate).toHaveBeenCalledWith(req.body)
        })

        it('should return 201 with no body', async () => {
            mockTrainingTypeCreate.mockResolvedValue(undefined)
            const res = makeMockResponse()
            const next = jest.fn()

            await controller.create(makeRequest(), res as Response, next)

            expect(res.status).toHaveBeenCalledWith(201)
            expect(res.send).toHaveBeenCalled()
            expect(next).not.toHaveBeenCalled()
        })

        it('should call next(err) when use case throws', async () => {
            const error = new Error('Validation failed')
            mockTrainingTypeCreate.mockRejectedValue(error)
            const res = makeMockResponse()
            const next = jest.fn()

            await controller.create(makeRequest(), res as Response, next)

            expect(next).toHaveBeenCalledWith(error)
            expect(res.status).not.toHaveBeenCalled()
        })

        it('should not call next on success', async () => {
            mockTrainingTypeCreate.mockResolvedValue(undefined)
            const res = makeMockResponse()
            const next = jest.fn()

            await controller.create(makeRequest(), res as Response, next)

            expect(next).not.toHaveBeenCalled()
        })
    })

    describe('getAll()', () => {
        it('should return 200 with mapped primitives', async () => {
            const mockType = { toPrimitives: () => TYPE_PRIMITIVES }
            mockTrainingTypeGetAll.mockResolvedValue([mockType])
            const res = makeMockResponse()

            await controller.getAll(makeRequest(), res as Response)

            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledWith({ data: [TYPE_PRIMITIVES] })
        })

        it('should return 200 with empty data array when no types exist', async () => {
            mockTrainingTypeGetAll.mockResolvedValue([])
            const res = makeMockResponse()

            await controller.getAll(makeRequest(), res as Response)

            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledWith({ data: [] })
        })

        it('should call toPrimitives on every type', async () => {
            const toPrimitives = jest.fn().mockReturnValue(TYPE_PRIMITIVES)
            mockTrainingTypeGetAll.mockResolvedValue([
                { toPrimitives },
                { toPrimitives },
            ])
            const res = makeMockResponse()

            await controller.getAll(makeRequest(), res as Response)

            expect(toPrimitives).toHaveBeenCalledTimes(2)
        })

        it('should propagate errors from the use case', async () => {
            mockTrainingTypeGetAll.mockRejectedValue(new Error('DB error'))
            const res = makeMockResponse()

            await expect(
                controller.getAll(makeRequest(), res as Response)
            ).rejects.toThrow('DB error')
        })
    })
})
