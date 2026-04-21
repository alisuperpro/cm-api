import { mockExecute } from './helpers/mockDb'
import { TYPE_ROW, SECONDARY_UUID } from './helpers/fixtures'

import { TrainingTypeTursoRepository } from '@/lib/Training/infrastructure/repository/trainingType.repository'
import { TrainingType } from '@/lib/Training/domain/entity/trainingType.entity'
import { TrainingTypeId } from '@/lib/Training/domain/value-objects/trainingTypeId.vo'
import { TrainingTypeType } from '@/lib/Training/domain/value-objects/trainingType/trainingTypeType.vo'
import { TrainingTypeSlug } from '@/lib/Training/domain/value-objects/trainingType/trainingTypeSlug.vo'

// ─── Helper ───────────────────────────────────────────────────────────────────

const buildType = (
    id = TYPE_ROW.id,
    type = TYPE_ROW.type,
    slug = TYPE_ROW.slug
) =>
    new TrainingType(
        new TrainingTypeId(id),
        new TrainingTypeType(type),
        new TrainingTypeSlug(slug)
    )

// ─── Tests ───────────────────────────────────────────────────────────────────

describe('TrainingTypeTursoRepository', () => {
    let repository: TrainingTypeTursoRepository

    beforeEach(() => {
        mockExecute.mockReset()
        repository = new TrainingTypeTursoRepository()
    })

    describe('create()', () => {
        it('should call db.execute once with an INSERT query', async () => {
            mockExecute.mockResolvedValue({ rows: [] })

            await repository.create(buildType())

            expect(mockExecute).toHaveBeenCalledTimes(1)
            const { sql } = mockExecute.mock.calls[0][0]
            expect(sql).toMatch(/INSERT INTO training_type/i)
        })

        it('should use the generated UUID as id', async () => {
            mockExecute.mockResolvedValue({ rows: [] })

            await repository.create(buildType())

            const { args } = mockExecute.mock.calls[0][0]
            expect(args[0]).toBe('generated-uuid-1234')
        })

        it('should include type and slug values in args', async () => {
            mockExecute.mockResolvedValue({ rows: [] })

            await repository.create(buildType())

            const { args } = mockExecute.mock.calls[0][0]
            expect(args[1]).toBe(TYPE_ROW.type)
            expect(args[2]).toBe(TYPE_ROW.slug)
        })

        it('should use empty string when type is nullish', async () => {
            mockExecute.mockResolvedValue({ rows: [] })

            const typeWithoutValue = new TrainingType(
                new TrainingTypeId(TYPE_ROW.id)
            )

            await repository.create(typeWithoutValue)

            const { args } = mockExecute.mock.calls[0][0]
            expect(args[1]).toBe('')
            expect(args[2]).toBe('')
        })

        it('should propagate db errors', async () => {
            mockExecute.mockRejectedValue(new Error('DB error'))

            await expect(repository.create(buildType())).rejects.toThrow(
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

        it('should return a TrainingType instance for each row', async () => {
            mockExecute.mockResolvedValue({
                rows: [
                    TYPE_ROW,
                    { id: SECONDARY_UUID, type: 'seminar', slug: 'seminar' },
                ],
            })

            const result = await repository.getAll()

            expect(result).toHaveLength(2)
            result.forEach((t) => expect(t).toBeInstanceOf(TrainingType))
        })

        it('should map id, type and slug correctly from db rows', async () => {
            mockExecute.mockResolvedValue({
                rows: [
                    TYPE_ROW,
                    { id: SECONDARY_UUID, type: 'seminar', slug: 'seminar' },
                ],
            })

            const result = await repository.getAll()

            expect(result[0].id.value).toBe(TYPE_ROW.id)
            expect(result[0].type?.value).toBe(TYPE_ROW.type)
            expect(result[0].slug?.value).toBe(TYPE_ROW.slug)
            expect(result[1].id.value).toBe(SECONDARY_UUID)
            expect(result[1].type?.value).toBe('seminar')
            expect(result[1].slug?.value).toBe('seminar')
        })

        it('should call db.execute with a SELECT query on training_type', async () => {
            mockExecute.mockResolvedValue({ rows: [] })

            await repository.getAll()

            const { sql } = mockExecute.mock.calls[0][0]
            expect(sql).toMatch(/SELECT/i)
            expect(sql).toMatch(/training_type/i)
        })

        it('should propagate db errors', async () => {
            mockExecute.mockRejectedValue(new Error('DB error'))

            await expect(repository.getAll()).rejects.toThrow('DB error')
        })
    })
})
