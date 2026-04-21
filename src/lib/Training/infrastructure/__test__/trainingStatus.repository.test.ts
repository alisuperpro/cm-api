import { mockExecute } from './helpers/mockDb'
import { STATUS_ROW, SECONDARY_UUID } from './helpers/fixtures'

import { TrainingStatusTursoRepository } from '@/lib/Training/infrastructure/repository/trainingStatus.repository'
import { TrainingStatus } from '@/lib/Training/domain/entity/trainingStatus.entity'
import { TrainingStatusId } from '@/lib/Training/domain/value-objects/trainingStatusId.vo'
import { TrainingStatusStatus } from '@/lib/Training/domain/value-objects/trainingStatus/trainingStatusStatus.vo'

// ─── Helper ───────────────────────────────────────────────────────────────────

const buildStatus = (id = STATUS_ROW.id, status = STATUS_ROW.status) =>
    new TrainingStatus(
        new TrainingStatusId(id),
        new TrainingStatusStatus(status)
    )

// ─── Tests ───────────────────────────────────────────────────────────────────

describe('TrainingStatusTursoRepository', () => {
    let repository: TrainingStatusTursoRepository

    beforeEach(() => {
        mockExecute.mockReset()
        repository = new TrainingStatusTursoRepository()
    })

    describe('create()', () => {
        it('should call db.execute once with an INSERT query', async () => {
            mockExecute.mockResolvedValue({ rows: [] })

            await repository.create(buildStatus())

            expect(mockExecute).toHaveBeenCalledTimes(1)
            const { sql } = mockExecute.mock.calls[0][0]
            expect(sql).toMatch(/INSERT INTO training_status/i)
        })

        it('should use the generated UUID as id', async () => {
            mockExecute.mockResolvedValue({ rows: [] })

            await repository.create(buildStatus())

            const { args } = mockExecute.mock.calls[0][0]
            expect(args[0]).toBe('generated-uuid-1234')
        })

        it('should include the status value in args', async () => {
            mockExecute.mockResolvedValue({ rows: [] })

            await repository.create(buildStatus())

            const { args } = mockExecute.mock.calls[0][0]
            expect(args[1]).toBe(STATUS_ROW.status)
        })

        it('should use empty string when status value is nullish', async () => {
            mockExecute.mockResolvedValue({ rows: [] })

            const statusWithoutValue = new TrainingStatus(
                new TrainingStatusId(STATUS_ROW.id)
            )

            await repository.create(statusWithoutValue)

            const { args } = mockExecute.mock.calls[0][0]
            expect(args[1]).toBe('')
        })

        it('should propagate db errors', async () => {
            mockExecute.mockRejectedValue(new Error('DB error'))

            await expect(repository.create(buildStatus())).rejects.toThrow(
                'DB error'
            )
        })
    })

    describe('getAll()', () => {
        it('should return an empty array when there are no rows', async () => {
            mockExecute.mockResolvedValue({ rows: [] })

            const result = await repository.getAll()

            expect(result).toEqual([])
            expect(mockExecute).toHaveBeenCalledTimes(1)
        })

        it('should return a TrainingStatus instance for each row', async () => {
            mockExecute.mockResolvedValue({
                rows: [STATUS_ROW, { id: SECONDARY_UUID, status: 'inactive' }],
            })

            const result = await repository.getAll()

            expect(result).toHaveLength(2)
            result.forEach((s) => expect(s).toBeInstanceOf(TrainingStatus))
        })

        it('should map id and status correctly from db rows', async () => {
            mockExecute.mockResolvedValue({
                rows: [STATUS_ROW, { id: SECONDARY_UUID, status: 'inactive' }],
            })

            const result = await repository.getAll()

            expect(result[0].id.value).toBe(STATUS_ROW.id)
            expect(result[0].status?.value).toBe(STATUS_ROW.status)
            expect(result[1].id.value).toBe(SECONDARY_UUID)
            expect(result[1].status?.value).toBe('inactive')
        })

        it('should call db.execute with a SELECT query on training_status', async () => {
            mockExecute.mockResolvedValue({ rows: [] })

            await repository.getAll()

            const { sql } = mockExecute.mock.calls[0][0]
            expect(sql).toMatch(/SELECT/i)
            expect(sql).toMatch(/training_status/i)
        })

        it('should propagate db errors', async () => {
            mockExecute.mockRejectedValue(new Error('DB error'))

            await expect(repository.getAll()).rejects.toThrow('DB error')
        })
    })
})
