import { Training } from '@/lib/Training/domain/entity/training.entity'
import { TrainingId } from '@/lib/Training/domain/value-objects/trainingId.vo'

export interface TrainingRepository {
    create(training: Training): Promise<void>
    getAll(): Promise<Training[]>
    findById(id: TrainingId): Promise<Training | null>
}
