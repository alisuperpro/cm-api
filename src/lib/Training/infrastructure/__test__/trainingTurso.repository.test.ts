import { mockExecute } from './helpers/mockDb'
import { TRAINING_ROW } from './helpers/fixtures'

import { TrainingTursoRepository } from '@/lib/Training/infrastructure/repository/trainingTurso.repository'
import { Training } from '@/lib/Training/domain/entity/training.entity'
import { TrainingStatus } from '@/lib/Training/domain/entity/trainingStatus.entity'
import { TrainingType } from '@/lib/Training/domain/entity/trainingType.entity'
import { TrainingId } from '@/lib/Training/domain/value-objects/trainingId.vo'
import { TrainingTitle } from '@/lib/Training/domain/value-objects/trainingTitle.vo'
import { TrainingDescription } from '@/lib/Training/domain/value-objects/trainingDescription.vo'
import { TrainingDate } from '@/lib/Training/domain/value-objects/trainingDate.vo'
import { TrainingLocation } from '@/lib/Training/domain/value-objects/trainingLocation.vo'
import { TrainingSlug } from '@/lib/Training/domain/value-objects/trainingSlug.vo'
import { TrainingCreatedAt } from '@/lib/Training/domain/value-objects/trainingCreatedAt.vo'
import { TrainingStartTime } from '@/lib/Training/domain/value-objects/trainingStartTime.vo'
import { TrainingEndTime } from '@/lib/Training/domain/value-objects/trainingEndTime.vo'
import { TrainingBanner } from '@/lib/Training/domain/value-objects/trainingBanner.vo'
import { TrainingCapacity } from '@/lib/Training/domain/value-objects/trainingCapacity.vo'
import { TrainingStatusId } from '@/lib/Training/domain/value-objects/trainingStatusId.vo'
import { TrainingStatusStatus } from '@/lib/Training/domain/value-objects/trainingStatus/trainingStatusStatus.vo'
import { TrainingTypeId } from '@/lib/Training/domain/value-objects/trainingTypeId.vo'
import { TrainingTypeType } from '@/lib/Training/domain/value-objects/trainingType/trainingTypeType.vo'
import { TrainingTypeSlug } from '@/lib/Training/domain/value-objects/trainingType/trainingTypeSlug.vo'

// ─── Helper ───────────────────────────────────────────────────────────────────

const buildTraining = (row = TRAINING_ROW): Training =>
    new Training({
        id: new TrainingId(row.id),
        title: new TrainingTitle(row.title),
        description: new TrainingDescription(row.description),
        date: new TrainingDate(row.date),
        status: new TrainingStatus(
            new TrainingStatusId(row.status_id),
            new TrainingStatusStatus(row.status_name)
        ),
        location: new TrainingLocation(row.location),
        slug: new TrainingSlug(row.slug),
        createdAt: new TrainingCreatedAt(row.created_at),
        startTime: new TrainingStartTime(row.start_time),
        endTime: new TrainingEndTime(row.end_time),
        banner: new TrainingBanner(row.banner),
        capacity: new TrainingCapacity(row.capacity),
        type: new TrainingType(
            new TrainingTypeId(row.type_id),
            new TrainingTypeType(row.type_type),
            new TrainingTypeSlug(row.type_slug)
        ),
    })

// ─── Tests ───────────────────────────────────────────────────────────────────

describe('TrainingTursoRepository', () => {
    let repository: TrainingTursoRepository

    beforeEach(() => {
        mockExecute.mockReset()
        repository = new TrainingTursoRepository()
    })

    describe('create()', () => {
        it('should call db.execute once with an INSERT query', async () => {
            mockExecute.mockResolvedValue({ rows: [] })

            await repository.create(buildTraining())

            expect(mockExecute).toHaveBeenCalledTimes(1)
            const { sql } = mockExecute.mock.calls[0][0]
            expect(sql).toMatch(/INSERT INTO training/i)
        })

        it('should use the generated UUID, not the Training id', async () => {
            mockExecute.mockResolvedValue({ rows: [] })

            await repository.create(buildTraining())

            const { args } = mockExecute.mock.calls[0][0]
            expect(args[0]).toBe('generated-uuid-1234')
            expect(args).not.toContain(TRAINING_ROW.id)
        })

        it('should include all required fields in args', async () => {
            mockExecute.mockResolvedValue({ rows: [] })

            await repository.create(buildTraining())

            const { args } = mockExecute.mock.calls[0][0]
            expect(args).toContain(TRAINING_ROW.title)
            expect(args).toContain(TRAINING_ROW.slug)
            expect(args).toContain(TRAINING_ROW.capacity)
            expect(args).toContain(TRAINING_ROW.status_id)
            expect(args).toContain(TRAINING_ROW.type_id)
            expect(args).toContain(TRAINING_ROW.banner)
            expect(args).toContain(TRAINING_ROW.location)
            expect(args).toContain(TRAINING_ROW.description)
        })

        it('should propagate db errors', async () => {
            mockExecute.mockRejectedValue(new Error('DB error'))

            await expect(repository.create(buildTraining())).rejects.toThrow('DB error')
        })
    })

    describe('findById()', () => {
        it('should return a Training instance when row is found', async () => {
            mockExecute.mockResolvedValue({ rows: [TRAINING_ROW] })

            const result = await repository.findById(new TrainingId(TRAINING_ROW.id))

            expect(result).toBeInstanceOf(Training)
        })

        it('should map all fields correctly from the db row', async () => {
            mockExecute.mockResolvedValue({ rows: [TRAINING_ROW] })

            const result = await repository.findById(new TrainingId(TRAINING_ROW.id))

            expect(result!.id.value).toBe(TRAINING_ROW.id)
            expect(result!.title.value).toBe(TRAINING_ROW.title)
            expect(result!.description.value).toBe(TRAINING_ROW.description)
            expect(result!.slug.value).toBe(TRAINING_ROW.slug)
            expect(result!.capacity.value).toBe(TRAINING_ROW.capacity)
            expect(result!.status.id.value).toBe(TRAINING_ROW.status_id)
            expect(result!.status.status?.value).toBe(TRAINING_ROW.status_name)
            expect(result!.type.id.value).toBe(TRAINING_ROW.type_id)
            expect(result!.type.type?.value).toBe(TRAINING_ROW.type_type)
            expect(result!.type.slug?.value).toBe(TRAINING_ROW.type_slug)
        })

        it('should return null when no row is found', async () => {
            mockExecute.mockResolvedValue({ rows: [] })

            const result = await repository.findById(new TrainingId('non-existent-id'))

            expect(result).toBeNull()
        })

        it('should return null when db throws (error caught internally)', async () => {
            mockExecute.mockRejectedValue(new Error('DB error'))

            const result = await repository.findById(new TrainingId(TRAINING_ROW.id))

            expect(result).toBeNull()
        })
    })

    describe('getAll()', () => {
        it('should return an empty array when there are no rows', async () => {
            mockExecute.mockResolvedValue({ rows: [] })

            const result = await repository.getAll()

            expect(result).toEqual([])
            expect(mockExecute).toHaveBeenCalledTimes(1)
        })

        it('should return a Training instance for each row', async () => {
            mockExecute.mockResolvedValue({
                rows: [TRAINING_ROW, { ...TRAINING_ROW, id: 'other-id' }],
            })

            const result = await repository.getAll()

            expect(result).toHaveLength(2)
            result.forEach((t) => expect(t).toBeInstanceOf(Training))
        })

        it('should map ids correctly across multiple rows', async () => {
            mockExecute.mockResolvedValue({
                rows: [TRAINING_ROW, { ...TRAINING_ROW, id: 'other-id' }],
            })

            const result = await repository.getAll()

            expect(result[0].id.value).toBe(TRAINING_ROW.id)
            expect(result[1].id.value).toBe('other-id')
        })

        it('should call db.execute with a SELECT query joining status and type', async () => {
            mockExecute.mockResolvedValue({ rows: [] })

            await repository.getAll()

            const { sql } = mockExecute.mock.calls[0][0]
            expect(sql).toMatch(/SELECT/i)
            expect(sql).toMatch(/training_status/i)
            expect(sql).toMatch(/training_type/i)
        })

        it('should propagate db errors', async () => {
            mockExecute.mockRejectedValue(new Error('DB error'))

            await expect(repository.getAll()).rejects.toThrow('DB error')
        })
    })
})
