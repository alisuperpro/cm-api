import { TrainingNotFoundError } from '../../domain/error/trainingNotFoundError.error'
import { TrainingRepository } from '../../domain/repository/training.repository'
import { TrainingId } from '../../domain/value-objects/trainingId.vo'

export class TrainingFindById {
    constructor(private repository: TrainingRepository) {}

    async run(id: string) {
        const training = await this.repository.findById(new TrainingId(id))

        if (!training) {
            throw new TrainingNotFoundError('Training not found')
        }

        return training
    }
}
