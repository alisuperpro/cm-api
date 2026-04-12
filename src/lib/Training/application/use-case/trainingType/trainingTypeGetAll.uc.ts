import { TrainingTypeRepository } from '../../../domain/repository/trainingType.repository'

export class TrainingTypeGetAll {
    constructor(private repository: TrainingTypeRepository) {}

    async run() {
        return await this.repository.getAll()
    }
}
