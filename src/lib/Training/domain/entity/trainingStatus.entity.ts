import { TrainingStatusStatus } from '../value-objects/trainingStatus/trainingStatusStatus.vo'
import { TrainingStatusId } from '../value-objects/trainingStatusId.vo'

export class TrainingStatus {
    constructor(
        public readonly id: TrainingStatusId,
        public readonly status: TrainingStatusStatus
    ) {}
}
