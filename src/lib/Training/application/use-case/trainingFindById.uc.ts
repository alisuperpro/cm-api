import { TrainingNotFoundError } from '@/lib/Training/domain/error/trainingNotFoundError.error'
import { TrainingRepository } from '@/lib/Training/domain/repository/training.repository'
import { TrainingId } from '@/lib/Training/domain/value-objects/trainingId.vo'

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
