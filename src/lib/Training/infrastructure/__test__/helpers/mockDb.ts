export const mockExecute = jest.fn()

jest.mock('@/lib/shared/insfrastructure/database/turso.db', () => ({
    TursoDatabase: {
        getInstance: () => ({
            getClient: () => ({ execute: mockExecute }),
        }),
    },
}))

jest.mock('@/lib/shared/insfrastructure/utils/generateUUID', () => ({
    generateUUID: () => 'generated-uuid-1234',
}))
