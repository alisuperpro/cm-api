import { Training } from '../../domain/entity/training.entity'
import { TrainingRepository } from '../../domain/repository/training.repository'
import { TrainingBanner } from '../../domain/value-objects/trainingBanner.vo'
import { TrainingCapacity } from '../../domain/value-objects/trainingCapacity.vo'
import { TrainingCreatedAt } from '../../domain/value-objects/trainingCreatedAt.vo'
import { TrainingDate } from '../../domain/value-objects/trainingDate.vo'
import { TrainingDescription } from '../../domain/value-objects/trainingDescription.vo'
import { TrainingEndTime } from '../../domain/value-objects/trainingEndTime.vo'
import { TrainingId } from '../../domain/value-objects/trainingId.vo'
import { TrainingLocation } from '../../domain/value-objects/trainingLocation.vo'
import { TrainingSlug } from '../../domain/value-objects/trainingSlug.vo'
import { TrainingStartTime } from '../../domain/value-objects/trainingStartTime.vo'
import { TrainingStatusId } from '../../domain/value-objects/trainingStatusId.vo'
import { TrainingTitle } from '../../domain/value-objects/trainingTitle.vo'
import { TrainingTypeId } from '../../domain/value-objects/trainingTypeId.vo'
import { TrainingCreateDTO } from '../dto/trainingCreate.dto'

export class TrainingCreate {
    constructor(private repository: TrainingRepository) {}

    async run(training: TrainingCreateDTO) {
        const trainingObject = new Training({
            id: new TrainingId(training.id),
            title: new TrainingTitle(training.title),
            description: new TrainingDescription(training.description),
            date: new TrainingDate(training.date),
            statusId: new TrainingStatusId(training.statusId),
            location: new TrainingLocation(training.location),
            slug: new TrainingSlug(training.slug),
            createdAt: new TrainingCreatedAt(training.createdAt),
            startTime: new TrainingStartTime(training.startTime),
            endTime: new TrainingEndTime(training.endTime),
            banner: new TrainingBanner(training.banner),
            capacity: new TrainingCapacity(training.capacity),
            typeId: new TrainingTypeId(training.typeId),
        })

        return await this.repository.create(trainingObject)
    }
}
