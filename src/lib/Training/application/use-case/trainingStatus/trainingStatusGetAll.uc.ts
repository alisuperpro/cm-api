import { TrainingStatusRepository } from '@/lib/Training/domain/repository/trainingStatus.repository'

export class TrainingStatusGetAll {
    constructor(private repository: TrainingStatusRepository) {}

    async run() {
        return this.repository.getAll()
    }
}
