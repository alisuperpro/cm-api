import { TrainingType } from '@/lib/Training/domain/entity/trainingType.entity'

export interface TrainingTypeRepository {
    create(type: TrainingType): Promise<void>
    getAll(): Promise<TrainingType[]>
}
