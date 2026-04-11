import { Training } from '../entity/training.entity'
import { TrainingId } from '../value-objects/trainingId.vo'

export interface TrainingRepository {
    create(training: Training): Promise<void>
    getAll(): Promise<Training[]>
    findById(id: TrainingId): Promise<Training | null>
}
