import { Request, Response } from 'express'

export const mockTrainingCreate = jest.fn()
export const mockTrainingGetAll = jest.fn()
export const mockTrainingFindById = jest.fn()
export const mockTrainingStatusCreate = jest.fn()
export const mockTrainingStatusGetAll = jest.fn()
export const mockTrainingTypeCreate = jest.fn()
export const mockTrainingTypeGetAll = jest.fn()

jest.mock('@/lib/shared/insfrastructure/services/serviceContainer', () => ({
    serviceContainer: {
        training: {
            create: { run: mockTrainingCreate },
            getAll: { run: mockTrainingGetAll },
            findById: { run: mockTrainingFindById },
        },
        trainingStatus: {
            create: { run: mockTrainingStatusCreate },
            getAll: { run: mockTrainingStatusGetAll },
        },
        trainingType: {
            create: { run: mockTrainingTypeCreate },
            getAll: { run: mockTrainingTypeGetAll },
        },
    },
}))

export const makeMockResponse = (): jest.Mocked<Partial<Response>> => {
    const res: any = {}
    res.status = jest.fn().mockReturnValue(res)
    res.json = jest.fn().mockReturnValue(res)
    res.send = jest.fn().mockReturnValue(res)
    return res
}

export const makeRequest = (overrides: Partial<Request> = {}): Request =>
    ({
        body: {},
        params: {},
        files: {},
        ...overrides,
    } as Request)
