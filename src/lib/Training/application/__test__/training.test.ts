import { TrainingCreate } from '@/lib/Training/application/use-case/trainingCreate.uc'
import { TrainingFindById } from '@/lib/Training/application/use-case/trainingFindById.uc'
import { TrainingGetAll } from '@/lib/Training/application/use-case/trainingGetAll.uc'
import { TrainingStatusCreate } from '@/lib/Training/application/use-case/trainingStatus/trainingStatusCreate.uc'
import { TrainingStatusGetAll } from '@/lib/Training/application/use-case/trainingStatus/trainingStatusGetAll.uc'
import { TrainingRepository } from '@/lib/Training/domain/repository/training.repository'
import { TrainingStatusRepository } from '@/lib/Training/domain/repository/trainingStatus.repository'
import { TrainingNotFoundError } from '@/lib/Training/domain/error/trainingNotFoundError.error'
import { Training } from '@/lib/Training/domain/entity/training.entity'
import { TrainingStatus } from '@/lib/Training/domain/entity/trainingStatus.entity'
import { TrainingCreateDTO } from '@/lib/Training/application/dto/trainingCreate.dto'
import { TrainingStatusCreateDTO } from '@/lib/Training/application/dto/trainingStatusCreate.dto'

// ─── Fixtures ────────────────────────────────────────────────────────────────

const TRAINING_DTO: TrainingCreateDTO = {
    id: '123e4567-e89b-12d3-a456-426614174000',
    title: 'Test Training',
    description: 'Una descripción válida',
    date: '01/06/2027',
    statusId: '123e4567-e89b-12d3-a456-426614174010',
    location: 'Bogotá',
    slug: 'test-training',
    createdAt: '2025-01-01T00:00:00.000Z',
    startTime: '09:00',
    endTime: '11:00',
    banner: 'https://cdn.example.com/banner.jpg',
    capacity: 30,
    typeId: '123e4567-e89b-12d3-a456-426614174011',
}

const STATUS_DTO: TrainingStatusCreateDTO = {
    id: '123e4567-e89b-12d3-a456-426614174010',
    status: 'active',
}

// ─── Repository mocks ─────────────────────────────────────────────────────────

const makeMockTrainingRepository = (
    overrides: Partial<TrainingRepository> = {}
): jest.Mocked<TrainingRepository> =>
    ({
        create: jest.fn().mockResolvedValue(undefined),
        findById: jest.fn().mockResolvedValue(null),
        getAll: jest.fn().mockResolvedValue([]),
        ...overrides,
    }) as jest.Mocked<TrainingRepository>

const makeMockStatusRepository = (
    overrides: Partial<TrainingStatusRepository> = {}
): jest.Mocked<TrainingStatusRepository> =>
    ({
        create: jest.fn().mockResolvedValue(undefined),
        getAll: jest.fn().mockResolvedValue([]),
        ...overrides,
    }) as jest.Mocked<TrainingStatusRepository>

// ─── Tests ───────────────────────────────────────────────────────────────────

describe('Training Application Layer', () => {
    describe('TrainingCreate', () => {
        it('should call repository.create with a Training instance', async () => {
            const repository = makeMockTrainingRepository()
            const useCase = new TrainingCreate(repository)

            await useCase.run(TRAINING_DTO)

            expect(repository.create).toHaveBeenCalledTimes(1)
            expect(repository.create).toHaveBeenCalledWith(expect.any(Training))
        })

        it('should build the Training with the correct primitive values', async () => {
            let capturedTraining: Training | undefined

            const repository = makeMockTrainingRepository({
                create: jest.fn().mockImplementation(async (t: Training) => {
                    capturedTraining = t
                }),
            })

            await new TrainingCreate(repository).run(TRAINING_DTO)

            expect(capturedTraining!.id.value).toBe(TRAINING_DTO.id)
            expect(capturedTraining!.title.value).toBe(TRAINING_DTO.title)
            expect(capturedTraining!.description.value).toBe(
                TRAINING_DTO.description
            )
            expect(capturedTraining!.slug.value).toBe(TRAINING_DTO.slug)
            expect(capturedTraining!.capacity.value).toBe(TRAINING_DTO.capacity)
            expect(capturedTraining!.status.id.value).toBe(
                TRAINING_DTO.statusId
            )
            expect(capturedTraining!.type.id.value).toBe(TRAINING_DTO.typeId)
        })

        it('should return the value from repository.create', async () => {
            const created = { id: TRAINING_DTO.id }
            const repository = makeMockTrainingRepository({
                create: jest.fn().mockResolvedValue(created),
            })

            const result = await new TrainingCreate(repository).run(
                TRAINING_DTO
            )

            expect(result).toBe(created)
        })

        it('should throw when DTO has an invalid field', async () => {
            const repository = makeMockTrainingRepository()

            await expect(
                new TrainingCreate(repository).run({
                    ...TRAINING_DTO,
                    title: '',
                })
            ).rejects.toThrow()

            expect(repository.create).not.toHaveBeenCalled()
        })

        it('should propagate repository errors', async () => {
            const repository = makeMockTrainingRepository({
                create: jest.fn().mockRejectedValue(new Error('DB error')),
            })

            await expect(
                new TrainingCreate(repository).run(TRAINING_DTO)
            ).rejects.toThrow('DB error')
        })
    })

    describe('TrainingFindById', () => {
        it('should return the training when found', async () => {
            const mockTraining = {} as Training
            const repository = makeMockTrainingRepository({
                findById: jest.fn().mockResolvedValue(mockTraining),
            })

            const result = await new TrainingFindById(repository).run(
                TRAINING_DTO.id
            )

            expect(result).toBe(mockTraining)
            expect(repository.findById).toHaveBeenCalledTimes(1)
        })

        it('should call repository.findById with a TrainingId built from the string', async () => {
            const repository = makeMockTrainingRepository({
                findById: jest.fn().mockResolvedValue({} as Training),
            })

            await new TrainingFindById(repository).run(TRAINING_DTO.id)

            const passedArg = (repository.findById as jest.Mock).mock
                .calls[0][0]
            expect(passedArg.value).toBe(TRAINING_DTO.id)
        })

        it('should throw TrainingNotFoundError when training does not exist', async () => {
            const repository = makeMockTrainingRepository({
                findById: jest.fn().mockResolvedValue(null),
            })

            await expect(
                new TrainingFindById(repository).run('non-existent-id')
            ).rejects.toThrow(TrainingNotFoundError)

            await expect(
                new TrainingFindById(repository).run('non-existent-id')
            ).rejects.toThrow('Training not found')
        })

        it('should propagate repository errors', async () => {
            const repository = makeMockTrainingRepository({
                findById: jest.fn().mockRejectedValue(new Error('DB error')),
            })

            await expect(
                new TrainingFindById(repository).run(TRAINING_DTO.id)
            ).rejects.toThrow('DB error')
        })
    })

    describe('TrainingGetAll', () => {
        it('should return an empty array when there are no trainings', async () => {
            const repository = makeMockTrainingRepository({
                getAll: jest.fn().mockResolvedValue([]),
            })

            const result = await new TrainingGetAll(repository).run()

            expect(result).toEqual([])
            expect(repository.getAll).toHaveBeenCalledTimes(1)
        })

        it('should return all trainings from the repository', async () => {
            const mockTrainings = [{} as Training, {} as Training]
            const repository = makeMockTrainingRepository({
                getAll: jest.fn().mockResolvedValue(mockTrainings),
            })

            const result = await new TrainingGetAll(repository).run()

            expect(result).toBe(mockTrainings)
            expect(result).toHaveLength(2)
        })

        it('should propagate repository errors', async () => {
            const repository = makeMockTrainingRepository({
                getAll: jest.fn().mockRejectedValue(new Error('DB error')),
            })

            await expect(new TrainingGetAll(repository).run()).rejects.toThrow(
                'DB error'
            )
        })
    })

    describe('TrainingStatusCreate', () => {
        it('should call repository.create with a TrainingStatus instance', async () => {
            const repository = makeMockStatusRepository()

            await new TrainingStatusCreate(repository).run(STATUS_DTO)

            expect(repository.create).toHaveBeenCalledTimes(1)
            expect(repository.create).toHaveBeenCalledWith(
                expect.any(TrainingStatus)
            )
        })

        it('should build the TrainingStatus with the correct values', async () => {
            let capturedStatus: TrainingStatus | undefined

            const repository = makeMockStatusRepository({
                create: jest
                    .fn()
                    .mockImplementation(async (s: TrainingStatus) => {
                        capturedStatus = s
                    }),
            })

            await new TrainingStatusCreate(repository).run(STATUS_DTO)

            expect(capturedStatus!.id.value).toBe(STATUS_DTO.id)
            expect(capturedStatus!.status?.value).toBe(STATUS_DTO.status)
        })

        it('should return the value from repository.create', async () => {
            const created = { id: STATUS_DTO.id }
            const repository = makeMockStatusRepository({
                create: jest.fn().mockResolvedValue(created),
            })

            const result = await new TrainingStatusCreate(repository).run(
                STATUS_DTO
            )

            expect(result).toBe(created)
        })

        it('should throw when status value is empty', async () => {
            const repository = makeMockStatusRepository()

            await expect(
                new TrainingStatusCreate(repository).run({
                    ...STATUS_DTO,
                    status: '',
                })
            ).rejects.toThrow('Training status is required')

            expect(repository.create).not.toHaveBeenCalled()
        })

        it('should propagate repository errors', async () => {
            const repository = makeMockStatusRepository({
                create: jest.fn().mockRejectedValue(new Error('DB error')),
            })

            await expect(
                new TrainingStatusCreate(repository).run(STATUS_DTO)
            ).rejects.toThrow('DB error')
        })
    })

    describe('TrainingStatusGetAll', () => {
        it('should return an empty array when there are no statuses', async () => {
            const repository = makeMockStatusRepository({
                getAll: jest.fn().mockResolvedValue([]),
            })

            const result = await new TrainingStatusGetAll(repository).run()

            expect(result).toEqual([])
            expect(repository.getAll).toHaveBeenCalledTimes(1)
        })

        it('should return all statuses from the repository', async () => {
            const mockStatuses = [{} as TrainingStatus, {} as TrainingStatus]
            const repository = makeMockStatusRepository({
                getAll: jest.fn().mockResolvedValue(mockStatuses),
            })

            const result = await new TrainingStatusGetAll(repository).run()

            expect(result).toBe(mockStatuses)
            expect(result).toHaveLength(2)
        })

        it('should propagate repository errors', async () => {
            const repository = makeMockStatusRepository({
                getAll: jest.fn().mockRejectedValue(new Error('DB error')),
            })

            await expect(
                new TrainingStatusGetAll(repository).run()
            ).rejects.toThrow('DB error')
        })
    })
})
