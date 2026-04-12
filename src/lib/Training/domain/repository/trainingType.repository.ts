import { TrainingType } from '../entity/trainingType.entity'

export interface TrainingTypeRepository {
    create(type: TrainingType): Promise<void>
    getAll(): Promise<TrainingType[]>
}
