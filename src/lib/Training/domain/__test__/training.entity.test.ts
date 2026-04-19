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

describe('Training Entity', () => {
    const makeTraining = (overrides = {}) =>
        new Training({
            id: new TrainingId('123e4567-e89b-12d3-a456-426614174000'),
            title: new TrainingTitle('Test Training'),
            description: new TrainingDescription('Una descripción válida'),
            date: new TrainingDate('01/06/2027'),
            status: new TrainingStatus(
                new TrainingStatusId('123e4567-e89b-12d3-a456-426614174010'),
                new TrainingStatusStatus('active')
            ),
            location: new TrainingLocation('Bogotá'),
            slug: new TrainingSlug('test-training'),
            createdAt: new TrainingCreatedAt('2025-01-01'),
            startTime: new TrainingStartTime('09:00'),
            endTime: new TrainingEndTime('11:00'),
            banner: new TrainingBanner('https://cdn.example.com/banner.jpg'),
            capacity: new TrainingCapacity(30),
            type: new TrainingType(
                new TrainingTypeId('1234567'),
                new TrainingTypeType('workshop'),
                new TrainingTypeSlug('workshop')
            ),
        })

    it('should create a Training with all properties', () => {
        const training = makeTraining()
        expect(training.id.value).toBe('123e4567-e89b-12d3-a456-426614174000')
        expect(training.title.value).toBe('Test Training')
        expect(training.capacity.value).toBe(30)
    })

    describe('Test Training title', () => {
        it('is valid', () => {
            const title = new TrainingTitle('Test')
            expect(title.value).toBe('Test')
        })
        it('not valid', () => {
            expect(() => new TrainingTitle('')).toThrow(
                'Training title not valid'
            )
        })
        it('Too short', () => {
            expect(() => new TrainingTitle('Te')).toThrow(
                'Training title must be at least 3 characters long'
            )
        })
    })

    describe('Test Description', () => {
        it('Should be return a valid description', () => {
            const description = new TrainingDescription('Test description')

            expect(description.value).toBe('Test description')
        })

        it('Should be return null if passing null', () => {
            const description = new TrainingDescription(null)

            expect(description.value).toBe(null)
        })

        it('Should be return error if passing other type (string | null)', () => {
            expect(() => {
                //@ts-ignore
                new TrainingDescription(undefined)
            }).toThrow(
                'Training description type not valid, valid (string | null)'
            )
        })
    })

    describe('Test Date', () => {
        const day = new Date().getDate()
        const month = `${new Date().getMonth() + 1}`.padStart(2, '0')
        const year = new Date().getFullYear() + 1

        it('Is valid date', () => {
            const dateFormat = `${day}/${month}/${year}`

            const date = new TrainingDate(dateFormat)

            expect(date.value).toBe(dateFormat)
        })

        it('should be return an error if it is passed a type other than string ', () => {
            expect(() => {
                //@ts-ignore
                new TrainingDate(undefined)
            }).toThrow('Training date is required')
        })

        it('Should be return an error if passed a past date', () => {
            const dateFormat = `${day}/${month}/${year - 5}`

            expect(() => {
                new TrainingDate(dateFormat)
            }).toThrow('Training date could not be past')
        })

        it('Should be return an error if passed a invalid day', () => {
            expect(() => {
                new TrainingDate(`40/${month}/${year}`)
            }).toThrow('Training Date not valid date')
        })

        it('Should be return an error if passed a invalid month', () => {
            expect(() => {
                new TrainingDate(`${day}/15/${year}`)
            }).toThrow('Training Date date range not valid')
        })

        it('Should be return an error if passed a invalid year', () => {
            expect(() => {
                new TrainingDate(`${day}/${month}/999`)
            }).toThrow('Training Date not valid format')
        })
    })

    describe('Test Status', () => {
        it('Should be valid status', () => {
            const id = generateUUID()
            const status = new TrainingStatus(
                new TrainingStatusId(id),
                new TrainingStatusStatus('active')
            )

            expect(status.id.value).toBe(id)
            expect(status.status?.value).toBe('active')
        })

        it('Should be status undefined if passed void', () => {
            const id = generateUUID()
            const status = new TrainingStatus(new TrainingStatusId(id))

            expect(status.id.value).toBe(id)
            expect(status.status?.value).toBe(undefined)
        })

        it('Id should be a valid UUID', () => {
            const id = 'gsgdsgdsfgfdshd'
            expect(() => {
                new TrainingStatus(new TrainingStatusId(id))
            }).toThrow(
                'TrainingStatusId: <gsgdsgdsfgfdshd> is not a valid UUID'
            )
        })
    })

    describe('Test Location', () => {
        it('Should be valid location', () => {
            const location = new TrainingLocation('Bogotá')

            expect(location.value).toBe('Bogotá')
        })

        it('Should be return an error if passed void string', () => {
            expect(() => {
                new TrainingLocation('')
            }).toThrow('Training location is required')
        })

        it('Should be return an error if passed string < 5 characters long', () => {
            expect(() => {
                new TrainingLocation('Cali')
            }).toThrow('Training location must be at least 5 characters long')
        })
    })

    describe('Test Slug', () => {
        it('Should valid slug', () => {
            const slug = new TrainingSlug('test-training')

            expect(slug.value).toBe('test-training')
        })

        it('Should be return an error if passed void string', () => {
            expect(() => {
                new TrainingSlug('')
            }).toThrow('Training type slug is required')
        })

        it('Should be return an error if passed string < 3 characters long', () => {
            expect(() => {
                new TrainingSlug('te')
            }).toThrow('Training type slug too short')
        })
    })

    describe('Test CreatedAt', () => {
        it('Should be valid', () => {
            const date = new Date().toISOString()
            const createdAt = new TrainingCreatedAt(date)

            expect(createdAt.value).toBe(date)
        })

        it('Should be return an error if passed void string', () => {
            const date = ''

            expect(() => {
                new TrainingCreatedAt(date)
            }).toThrow('Training created at is required')
        })
    })

    describe('Test StartTime', () => {
        it('Should be valid', () => {
            const startTime = new TrainingStartTime('09:00')

            expect(startTime.value).toBe('09:00')
        })

        it('Should be return an error if passed not valid format', () => {
            expect(() => {
                new TrainingStartTime('9:00')
            }).toThrow('Training start time not valid format')
        })

        it('Should be return an error if passed void string', () => {
            expect(() => {
                new TrainingStartTime('')
            }).toThrow('Training start time is required')
        })
    })

    describe('Test EndTime', () => {})

    describe('Test Banner', () => {})

    describe('Test Capacity', () => {})

    describe('Test Type', () => {})

    describe('toPrimitives()', () => {
        it('should return a plain object with correct shape', () => {
            const training = makeTraining()
            const primitives = training.toPrimitives()

            expect(primitives).toMatchObject({
                id: '123e4567-e89b-12d3-a456-426614174000',
                title: 'Test Training',
                capacity: 30,
                status: {
                    id: '123e4567-e89b-12d3-a456-426614174010',
                    name: 'active',
                },
                type: { id: '1234567', name: 'workshop', slug: 'workshop' },
            })
        })

        it('should throw if status is empty', () => {
            expect(
                () =>
                    new TrainingStatus(
                        new TrainingStatusId(
                            '123e4567-e89b-12d3-a456-426614174010'
                        ),
                        new TrainingStatusStatus('') // ← esto debe explotar
                    )
            ).toThrow('Training status is required')
        })

        it('should handle null type.slug gracefully', () => {
            expect(
                () =>
                    new TrainingType(
                        new TrainingTypeId('1234567'),
                        new TrainingTypeType('workshop'),
                        new TrainingTypeSlug('')
                    )
            ).toThrow('Training type slug not valid')
        })
    })
})
