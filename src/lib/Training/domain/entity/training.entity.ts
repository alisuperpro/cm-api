import { TrainingBanner } from '../value-objects/trainingBanner.vo'
import { TrainingCapacity } from '../value-objects/trainingCapacity.vo'
import { TrainingCreatedAt } from '../value-objects/trainingCreatedAt.vo'
import { TrainingDate } from '../value-objects/trainingDate.vo'
import { TrainingDescription } from '../value-objects/trainingDescription.vo'
import { TrainingEndTime } from '../value-objects/trainingEndTime.vo'
import { TrainingId } from '../value-objects/trainingId.vo'
import { TrainingLocation } from '../value-objects/trainingLocation.vo'
import { TrainingSlug } from '../value-objects/trainingSlug.vo'
import { TrainingStartTime } from '../value-objects/trainingStartTime.vo'
import { TrainingStatusId } from '../value-objects/trainingStatusId.vo'
import { TrainingTitle } from '../value-objects/trainingTitle.vo'
import { TrainingTypeId } from '../value-objects/trainingTypeId.vo'

export interface ITraining {
    id: TrainingId
    title: TrainingTitle
    description: TrainingDescription
    date: TrainingDate
    statusId: TrainingStatusId
    location: TrainingLocation
    slug: TrainingSlug
    createdAt: TrainingCreatedAt
    startTime: TrainingStartTime
    endTime: TrainingEndTime
    banner: TrainingBanner
    capacity: TrainingCapacity
    typeId: TrainingTypeId
}

export class Training {
    public readonly id: TrainingId
    public readonly title: TrainingTitle
    public readonly description: TrainingDescription
    public readonly date: TrainingDate
    public readonly statusId: TrainingStatusId
    public readonly location: TrainingLocation
    public readonly slug: TrainingSlug
    public readonly createdAt: TrainingCreatedAt
    public readonly startTime: TrainingStartTime
    public readonly endTime: TrainingEndTime
    public readonly banner: TrainingBanner
    public readonly capacity: TrainingCapacity
    public readonly typeId: TrainingTypeId

    constructor(training: ITraining) {
        this.id = training.id
        this.title = training.title
        this.description = training.description
        this.date = training.date
        this.statusId = training.statusId
        this.location = training.location
        this.slug = training.slug
        this.createdAt = training.createdAt
        this.startTime = training.startTime
        this.endTime = training.endTime
        this.banner = training.banner
        this.capacity = training.capacity
        this.typeId = training.typeId
    }
}
