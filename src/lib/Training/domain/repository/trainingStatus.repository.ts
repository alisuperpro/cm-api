import { TrainingStatus } from '@/lib/Training/domain/entity/trainingStatus.entity'

export interface TrainingStatusRepository {
    create(trainingStatus: TrainingStatus): Promise<void>
    getAll(): Promise<TrainingStatus[]>
}
