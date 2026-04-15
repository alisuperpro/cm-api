import { Training } from '@/lib/Training/domain/entity/training.entity'
import { TrainingStatus } from '@/lib/Training/domain/entity/trainingStatus.entity'
import { TrainingType } from '@/lib/Training/domain/entity/trainingType.entity'
import { TrainingRepository } from '@/lib/Training/domain/repository/training.repository'
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
import { TrainingStatusId } from '@/lib/Training/domain/value-objects/trainingStatusId.vo'
import { TrainingTitle } from '@/lib/Training/domain/value-objects/trainingTitle.vo'
import { TrainingTypeId } from '@/lib/Training/domain/value-objects/trainingTypeId.vo'
import { TrainingCreateDTO } from '@/lib/Training/application/dto/trainingCreate.dto'

export class TrainingCreate {
    constructor(private repository: TrainingRepository) {}

    async run(training: TrainingCreateDTO) {
        const trainingObject = new Training({
            id: new TrainingId(training.id),
            title: new TrainingTitle(training.title),
            description: new TrainingDescription(training.description),
            date: new TrainingDate(training.date),
            status: new TrainingStatus(new TrainingStatusId(training.statusId)),
            location: new TrainingLocation(training.location),
            slug: new TrainingSlug(training.slug),
            createdAt: new TrainingCreatedAt(training.createdAt),
            startTime: new TrainingStartTime(training.startTime),
            endTime: new TrainingEndTime(training.endTime),
            banner: new TrainingBanner(training.banner),
            capacity: new TrainingCapacity(training.capacity),
            type: new TrainingType(new TrainingTypeId(training.typeId)),
        })

        return await this.repository.create(trainingObject)
    }
}
