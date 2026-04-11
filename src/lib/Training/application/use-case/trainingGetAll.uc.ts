import { TrainingRepository } from '../../domain/repository/training.repository'

export class TrainingGetAll {
    constructor(private repository: TrainingRepository) {}

    async run() {
        return await this.repository.getAll()
    }
}
