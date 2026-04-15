import { TrainingStatusStatus } from '@/lib/Training/domain/value-objects/trainingStatus/trainingStatusStatus.vo'
import { TrainingStatusId } from '@/lib/Training/domain/value-objects/trainingStatusId.vo'

export class TrainingStatus {
    constructor(
        public readonly id: TrainingStatusId,
        public readonly status?: TrainingStatusStatus
    ) {}

    toPrimitives() {
        return {
            id: this.id.value,
            status: this.status?.value,
        }
    }
}
