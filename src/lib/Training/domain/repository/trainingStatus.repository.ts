import { TrainingStatus } from '../entity/trainingStatus.entity'

export interface TrainingStatusRepository {
    create(trainingStatus: TrainingStatus): Promise<void>
    getAll(): Promise<TrainingStatus[]>
}
