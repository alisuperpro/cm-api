import { Training } from '@/lib/Training/domain/entity/training.entity'
import { TrainingId } from '@/lib/Training/domain/value-objects/trainingId.vo'
import { TrainingTitle } from '@/lib/Training/domain/value-objects/trainingTitle.vo'
import { TrainingDescription } from '../value-objects/trainingDescription.vo'
import { TrainingDate } from '../value-objects/trainingDate.vo'
import { TrainingStatus } from '../entity/trainingStatus.entity'
import { TrainingStatusId } from '../value-objects/trainingStatusId.vo'
import { TrainingStatusStatus } from '../value-objects/trainingStatus/trainingStatusStatus.vo'
import { TrainingLocation } from '../value-objects/trainingLocation.vo'
import { TrainingSlug } from '../value-objects/trainingSlug.vo'
import { TrainingCreatedAt } from '../value-objects/trainingCreatedAt.vo'
import { TrainingStartTime } from '../value-objects/trainingStartTime.vo'
import { TrainingEndTime } from '../value-objects/trainingEndTime.vo'
import { TrainingBanner } from '../value-objects/trainingBanner.vo'
import { TrainingCapacity } from '../value-objects/trainingCapacity.vo'
import { TrainingType } from '../entity/trainingType.entity'
import { TrainingTypeId } from '../value-objects/trainingTypeId.vo'
import { TrainingTypeType } from '../value-objects/trainingType/trainingTypeType.vo'
import { TrainingTypeSlug } from '../value-objects/trainingType/trainingTypeSlug.vo'
import { generateUUID } from '@/lib/shared/insfrastructure/utils/generateUUID'

// ─── Fixtures ────────────────────────────────────────────────────────────────

const FIXTURES = {
    id: '123e4567-e89b-12d3-a456-426614174000',
    statusId: '123e4567-e89b-12d3-a456-426614174010',
    typeId: '123e4567-e89b-12d3-a456-426614174011',
    title: 'Test Training',
    description: 'Una descripción válida',
    date: '01/06/2027',
    location: 'Bogotá',
    slug: 'test-training',
    createdAt: '2025-01-01',
    startTime: '09:00',
    endTime: '11:00',
    banner: 'https://cdn.example.com/banner.jpg',
    capacity: 30,
    status: 'active',
    typeType: 'workshop',
    typeSlug: 'workshop',
} as const

// ─── Helpers ─────────────────────────────────────────────────────────────────

const makeFutureDate = (yearsAhead = 1): string => {
    const d = new Date()
    const day = String(d.getDate()).padStart(2, '0')
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const year = d.getFullYear() + yearsAhead
    return `${day}/${month}/${year}`
}

const makeStatus = (id = FIXTURES.statusId, status = FIXTURES.status) =>
    new TrainingStatus(
        new TrainingStatusId(id),
        new TrainingStatusStatus(status)
    )

const makeType = (
    id = FIXTURES.typeId,
    type = FIXTURES.typeType,
    slug = FIXTURES.typeSlug
) =>
    new TrainingType(
        new TrainingTypeId(id),
        new TrainingTypeType(type),
        new TrainingTypeSlug(slug)
    )

const makeTraining = (
    overrides: Partial<ConstructorParameters<typeof Training>[0]> = {}
) =>
    new Training({
        id: new TrainingId(FIXTURES.id),
        title: new TrainingTitle(FIXTURES.title),
        description: new TrainingDescription(FIXTURES.description),
        date: new TrainingDate(FIXTURES.date),
        status: makeStatus(),
        location: new TrainingLocation(FIXTURES.location),
        slug: new TrainingSlug(FIXTURES.slug),
        createdAt: new TrainingCreatedAt(FIXTURES.createdAt),
        startTime: new TrainingStartTime(FIXTURES.startTime),
        endTime: new TrainingEndTime(FIXTURES.endTime),
        banner: new TrainingBanner(FIXTURES.banner),
        capacity: new TrainingCapacity(FIXTURES.capacity),
        type: makeType(),
        ...overrides,
    })

// ─── Tests ───────────────────────────────────────────────────────────────────

describe('Training Entity', () => {
    describe('construction', () => {
        it('should create a Training with all properties', () => {
            const training = makeTraining()

            expect(training.id.value).toBe(FIXTURES.id)
            expect(training.title.value).toBe(FIXTURES.title)
            expect(training.capacity.value).toBe(FIXTURES.capacity)
        })

        it('throws when startTime is equal to endTime', () => {
            expect(() =>
                makeTraining({
                    startTime: new TrainingStartTime('09:00'),
                    endTime: new TrainingEndTime('09:00'),
                })
            ).toThrow('Training start time must be before end time')
        })

        it('throws when startTime is after endTime', () => {
            expect(() =>
                makeTraining({
                    startTime: new TrainingStartTime('11:00'),
                    endTime: new TrainingEndTime('09:00'),
                })
            ).toThrow('Training start time must be before end time')
        })
    })

    describe('toPrimitives()', () => {
        it('should return a plain object with the correct shape', () => {
            const training = makeTraining()

            expect(training.toPrimitives()).toMatchObject({
                id: FIXTURES.id,
                title: FIXTURES.title,
                capacity: FIXTURES.capacity,
                status: { id: FIXTURES.statusId, name: FIXTURES.status },
                type: {
                    id: FIXTURES.typeId,
                    name: FIXTURES.typeType,
                    slug: FIXTURES.typeSlug,
                },
            })
        })

        it('should return null for status.name when status has no value', () => {
            const training = makeTraining({
                status: new TrainingStatus(
                    new TrainingStatusId(FIXTURES.statusId)
                ),
            })

            expect(training.toPrimitives().status.name).toBeNull()
        })

        it('should return null for type.slug when type has no slug', () => {
            // TrainingTypeSlug validates on construction, so we use a spy to
            // simulate a slug vo that carries an undefined/null internal value.
            const slugVo = Object.create(
                TrainingTypeSlug.prototype
            ) as TrainingTypeSlug
            Object.defineProperty(slugVo, 'value', { get: () => null })

            const training = makeTraining({
                type: new TrainingType(
                    new TrainingTypeId(FIXTURES.typeId),
                    new TrainingTypeType(FIXTURES.typeType),
                    slugVo
                ),
            })

            expect(training.toPrimitives().type.slug).toBeNull()
        })
    })

    // ── Value object tests ────────────────────────────────────────────────────
    // Each VO owns its validation; these tests confirm the contract the entity
    // depends on without re-testing internal VO logic exhaustively.

    describe('TrainingTitle', () => {
        it('accepts a valid title', () => {
            expect(new TrainingTitle('Test').value).toBe('Test')
        })

        it('throws when title is empty', () => {
            expect(() => new TrainingTitle('')).toThrow(
                'Training title not valid'
            )
        })

        it('throws when title is shorter than 3 characters', () => {
            expect(() => new TrainingTitle('Te')).toThrow(
                'Training title must be at least 3 characters long'
            )
        })
    })

    describe('TrainingDescription', () => {
        it('accepts a valid string', () => {
            expect(new TrainingDescription('Test description').value).toBe(
                'Test description'
            )
        })

        it('accepts null and preserves it', () => {
            expect(new TrainingDescription(null).value).toBeNull()
        })

        it('throws for types other than string or null', () => {
            // @ts-ignore – intentional invalid input
            expect(() => new TrainingDescription(undefined)).toThrow(
                'Training description type not valid, valid (string | null)'
            )
        })
    })

    describe('TrainingDate', () => {
        const futureDate = makeFutureDate(1)
        const pastDate = makeFutureDate(-5)

        it('accepts a valid future date', () => {
            expect(new TrainingDate(futureDate).value).toBe(futureDate)
        })

        it('throws when value is not a string', () => {
            // @ts-ignore
            expect(() => new TrainingDate(undefined)).toThrow(
                'Training date is required'
            )
        })

        it('throws for a past date', () => {
            expect(() => new TrainingDate(pastDate)).toThrow(
                'Training date could not be past'
            )
        })

        it('throws for an invalid day (> 31)', () => {
            const [, month, year] = futureDate.split('/')
            expect(() => new TrainingDate(`40/${month}/${year}`)).toThrow(
                'Training Date not valid date'
            )
        })

        it('throws for an invalid month (> 12)', () => {
            const [day, , year] = futureDate.split('/')
            expect(() => new TrainingDate(`${day}/15/${year}`)).toThrow(
                'Training Date date range not valid'
            )
        })

        it('throws for a year with fewer than 4 digits', () => {
            const [day, month] = futureDate.split('/')
            expect(() => new TrainingDate(`${day}/${month}/999`)).toThrow(
                'Training Date not valid format'
            )
        })
    })

    describe('TrainingStatus', () => {
        it('creates a valid status', () => {
            const id = generateUUID()
            //@ts-ignore
            const status = makeStatus(id)

            expect(status.id.value).toBe(id)
            expect(status.status?.value).toBe(FIXTURES.status)
        })

        it('allows status to be omitted (undefined)', () => {
            const id = generateUUID()
            const status = new TrainingStatus(new TrainingStatusId(id))

            expect(status.id.value).toBe(id)
            expect(status.status?.value).toBeUndefined()
        })

        it('throws when status value is empty', () => {
            expect(
                () =>
                    new TrainingStatus(
                        new TrainingStatusId(FIXTURES.statusId),
                        new TrainingStatusStatus('')
                    )
            ).toThrow('Training status is required')
        })

        it('throws when id is not a valid UUID', () => {
            const badId = 'not-a-uuid'
            expect(
                () => new TrainingStatus(new TrainingStatusId(badId))
            ).toThrow(`TrainingStatusId: <${badId}> is not a valid UUID`)
        })
    })

    describe('TrainingLocation', () => {
        it('accepts a valid location', () => {
            expect(new TrainingLocation('Bogotá').value).toBe('Bogotá')
        })

        it('throws when value is empty', () => {
            expect(() => new TrainingLocation('')).toThrow(
                'Training location is required'
            )
        })

        it('throws when value is shorter than 5 characters', () => {
            expect(() => new TrainingLocation('Cali')).toThrow(
                'Training location must be at least 5 characters long'
            )
        })
    })

    describe('TrainingSlug', () => {
        it('accepts a valid slug', () => {
            expect(new TrainingSlug('test-training').value).toBe(
                'test-training'
            )
        })

        it('throws when value is empty', () => {
            expect(() => new TrainingSlug('')).toThrow(
                'Training type slug is required'
            )
        })

        it('throws when value is shorter than 3 characters', () => {
            expect(() => new TrainingSlug('te')).toThrow(
                'Training type slug too short'
            )
        })
    })

    describe('TrainingCreatedAt', () => {
        it('accepts a valid ISO date string', () => {
            const iso = new Date().toISOString()
            expect(new TrainingCreatedAt(iso).value).toBe(iso)
        })

        it('throws when value is empty', () => {
            expect(() => new TrainingCreatedAt('')).toThrow(
                'Training created at is required'
            )
        })
    })

    describe('TrainingStartTime', () => {
        it('accepts a valid HH:MM time', () => {
            expect(new TrainingStartTime('09:00').value).toBe('09:00')
        })

        it('throws for a single-digit hour (wrong format)', () => {
            expect(() => new TrainingStartTime('9:00')).toThrow(
                'Training start time not valid format'
            )
        })

        it('throws when value is empty', () => {
            expect(() => new TrainingStartTime('')).toThrow(
                'Training start time is required'
            )
        })
    })

    describe('TrainingEndTime', () => {
        it('accepts a valid HH:MM time', () => {
            expect(new TrainingEndTime('09:00').value).toBe('09:00')
        })

        it('throws for a single-digit hour (wrong format)', () => {
            expect(() => new TrainingEndTime('9:00')).toThrow(
                'Training end time not valid format'
            )
        })

        it('throws when value is empty', () => {
            expect(() => new TrainingEndTime('')).toThrow(
                'Training end time is required'
            )
        })
    })

    describe('TrainingBanner', () => {
        it('accepts a valid HTTPS URL', () => {
            expect(new TrainingBanner(FIXTURES.banner).value).toBe(
                FIXTURES.banner
            )
        })

        it('throws when value is empty', () => {
            expect(() => new TrainingBanner('')).toThrow(
                'Training banner is required'
            )
        })

        it('throws for a non-HTTPS URL', () => {
            expect(
                () => new TrainingBanner('http://cdn.example.com/banner.jpg')
            ).toThrow('Training banner url not secure')
        })
    })

    describe('TrainingCapacity', () => {
        it('accepts a positive number', () => {
            expect(new TrainingCapacity(30).value).toBe(30)
        })

        it('throws for a negative number', () => {
            expect(() => new TrainingCapacity(-1)).toThrow(
                'Training capacity must be positive'
            )
        })

        it('throws for zero', () => {
            expect(() => new TrainingCapacity(0)).toThrow(
                'Training capacity is required'
            )
        })
    })

    describe('TrainingType', () => {
        it('creates a valid type with id, type and slug', () => {
            const type = makeType()

            expect(type.id.value).toBe(FIXTURES.typeId)
            expect(type.type?.value).toBe(FIXTURES.typeType)
            expect(type.slug?.value).toBe(FIXTURES.typeSlug)
        })

        it('throws when slug is empty', () => {
            expect(
                () =>
                    new TrainingType(
                        new TrainingTypeId(FIXTURES.typeId),
                        new TrainingTypeType(FIXTURES.typeType),
                        new TrainingTypeSlug('')
                    )
            ).toThrow('Training type slug not valid')
        })
    })
})
