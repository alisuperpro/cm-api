import { TrainingBanner } from '@/lib/Training/domain/value-objects/trainingBanner.vo'
import { TrainingCapacity } from '@/lib/Training/domain/value-objects/trainingCapacity.vo'
import { TrainingCreatedAt } from '@/lib/Training/domain/value-objects/trainingCreatedAt.vo'
import { TrainingDate } from '@/lib/Training/domain/value-objects/trainingDate.vo'
import { TrainingDescription } from '@/lib/Training/domain/value-objects/trainingDescription.vo'
import { TrainingEndTime } from '@/lib/Training/domain/value-objects/trainingEndTime.vo'
import { TrainingId } from '@/lib/Training/domain/value-objects/trainingId.vo'
import { TrainingLocation } from '@/lib/Training/domain/value-objects/trainingLocation.vo'
import { TrainingSlug } from '@/lib/Training/domain/value-objects/trainingSlug.vo'
import { TrainingStartTime } from '@/lib/Training/domain/value-objects/trainingStartTime.vo'
import { TrainingTitle } from '@/lib/Training/domain/value-objects/trainingTitle.vo'
import { TrainingStatus } from '@/lib/Training/domain/entity/trainingStatus.entity'
import { TrainingType } from '@/lib/Training/domain/entity//trainingType.entity'

export interface ITraining {
    id: TrainingId
    title: TrainingTitle
    description: TrainingDescription
    date: TrainingDate
    status: TrainingStatus
    location: TrainingLocation
    slug: TrainingSlug
    createdAt: TrainingCreatedAt
    startTime: TrainingStartTime
    endTime: TrainingEndTime
    banner: TrainingBanner
    capacity: TrainingCapacity
    type: TrainingType
}

export class Training {
    public readonly id: TrainingId
    public readonly title: TrainingTitle
    public readonly description: TrainingDescription
    public readonly date: TrainingDate
    public readonly status: TrainingStatus
    public readonly location: TrainingLocation
    public readonly slug: TrainingSlug
    public readonly createdAt: TrainingCreatedAt
    public readonly startTime: TrainingStartTime
    public readonly endTime: TrainingEndTime
    public readonly banner: TrainingBanner
    public readonly capacity: TrainingCapacity
    public readonly type: TrainingType

    constructor(training: ITraining) {
        this.id = training.id
        this.title = training.title
        this.description = training.description
        this.date = training.date
        this.status = training.status
        this.location = training.location
        this.slug = training.slug
        this.createdAt = training.createdAt
        this.startTime = training.startTime
        this.endTime = training.endTime
        this.banner = training.banner
        this.capacity = training.capacity
        this.type = training.type
        this.validateTimeRange()
    }

    private validateTimeRange(): void {
        const start = this.startTime.value
        const end = this.endTime.value

        if (!start || !end) return

        const [startHour, startMin] = start.split(':').map(Number)
        const [endHour, endMin] = end.split(':').map(Number)

        const startMinutes = startHour * 60 + startMin
        const endMinutes = endHour * 60 + endMin

        if (startMinutes >= endMinutes) {
            throw new Error('Training start time must be before end time')
        }
    }

    toPrimitives() {
        return {
            id: this.id.value,
            title: this.title.value,
            description: this.description.value,
            date: this.date.value,
            status: {
                id: this.status.id.value,
                name: this.status.status?.value ?? null,
            },
            location: this.location.value,
            slug: this.slug.value,
            createdAt: this.createdAt.value,
            startTime: this.startTime.value,
            endTime: this.endTime.value,
            banner: this.banner.value,
            capacity: this.capacity.value,
            type: {
                id: this.type.id.value,
                name: this.type.type?.value ?? null,
                slug: this.type.slug?.value ?? null,
            },
        }
    }
}
