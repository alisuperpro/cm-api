import { TrainingStatusCreate } from '@/lib/Training/application/use-case/trainingStatus/trainingStatusCreate.uc'
import { TrainingStatusGetAll } from '@/lib/Training/application/use-case/trainingStatus/trainingStatusGetAll.uc'
import { TrainingStatusTursoRepository } from '@/lib/Training/infrastructure/repository/trainingStatus.repository'

const trainingStatusRepository = new TrainingStatusTursoRepository()

export const trainingStatusServices = {
    create: new TrainingStatusCreate(trainingStatusRepository),
    getAll: new TrainingStatusGetAll(trainingStatusRepository),
}
