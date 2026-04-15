import { TrainingTypeRepository } from '@/lib/Training/domain/repository/trainingType.repository'

export class TrainingTypeGetAll {
    constructor(private repository: TrainingTypeRepository) {}

    async run() {
        return await this.repository.getAll()
    }
}
