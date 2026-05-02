import { TrainingTypeCreate } from '@/lib/Training/application/use-case/trainingType/trainingTypeCreate.uc'
import { TrainingTypeGetAll } from '@/lib/Training/application/use-case/trainingType/trainingTypeGetAll.uc'
import { TrainingTypeTursoRepository } from '@/lib/Training/infrastructure/repository/trainingType.repository'

const TrainingTypeRepository = new TrainingTypeTursoRepository()

export const trainingTypeServices = {
    create: new TrainingTypeCreate(TrainingTypeRepository),
    getAll: new TrainingTypeGetAll(TrainingTypeRepository),
}
