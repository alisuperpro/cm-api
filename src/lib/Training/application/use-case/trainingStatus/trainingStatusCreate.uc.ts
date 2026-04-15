import { TrainingStatus } from '@/lib/Training/domain/entity/trainingStatus.entity'
import { TrainingStatusRepository } from '@/lib/Training/domain/repository/trainingStatus.repository'
import { TrainingStatusStatus } from '@/lib/Training/domain/value-objects/trainingStatus/trainingStatusStatus.vo'
import { TrainingStatusId } from '@/lib/Training/domain/value-objects/trainingStatusId.vo'
import { TrainingStatusCreateDTO } from '@/lib/Training/application/dto/trainingStatusCreate.dto'

export class TrainingStatusCreate {
    constructor(private repository: TrainingStatusRepository) {}

    async run(trainingStatus: TrainingStatusCreateDTO) {
        const status = new TrainingStatus(
            new TrainingStatusId(trainingStatus.id),
            new TrainingStatusStatus(trainingStatus.status)
        )

        return await this.repository.create(status)
    }
}
