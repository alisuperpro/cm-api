import { TrainingStatus } from '../../../domain/entity/trainingStatus.entity'
import { TrainingStatusRepository } from '../../../domain/repository/trainingStatus.repository'
import { TrainingStatusStatus } from '../../../domain/value-objects/trainingStatus/trainingStatusStatus.vo'
import { TrainingStatusId } from '../../../domain/value-objects/trainingStatusId.vo'
import { TrainingStatusCreateDTO } from '../../dto/trainingStatusCreate.dto'

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
