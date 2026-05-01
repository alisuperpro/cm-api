import { TrainingNotFoundError } from '@/lib/Training/domain/error/trainingNotFoundError.error'
import { TrainingRepository } from '@/lib/Training/domain/repository/training.repository'
import { TrainingSlug } from '../../domain/value-objects/trainingSlug.vo'

export class TrainingFindBySlug {
    constructor(private repository: TrainingRepository) {}

    async run(slug: string) {
        const training = await this.repository.findBySlug(
            new TrainingSlug(slug)
        )

        if (!training) {
            throw new TrainingNotFoundError('Training not found')
        }

        return training
    }
}
