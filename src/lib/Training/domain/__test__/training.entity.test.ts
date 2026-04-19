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

describe('Training Entity', () => {
    const makeTraining = (overrides = {}) =>
        new Training({
            id: new TrainingId('123e4567-e89b-12d3-a456-426614174000'),
            title: new TrainingTitle('Test Training'),
            description: new TrainingDescription('Una descripción válida'),
            date: new TrainingDate('2025-06-01'),
            status: new TrainingStatus(
                new TrainingStatusId('123456'),
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
    })

    describe('toPrimitives()', () => {
        it('should return a plain object with correct shape', () => {
            const training = makeTraining()
            const primitives = training.toPrimitives()

            expect(primitives).toMatchObject({
                id: '123e4567-e89b-12d3-a456-426614174000',
                title: 'Test Training',
                capacity: 30,
                status: { id: '123456', name: 'active' },
                type: { id: '1234567', name: 'workshop', slug: 'workshop' },
            })
        })

        it('should throw if status is empty', () => {
            expect(
                () =>
                    new TrainingStatus(
                        new TrainingStatusId('123456'),
                        new TrainingStatusStatus('') // ← esto debe explotar
                    )
            ).toThrow('Training status not valid')
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
