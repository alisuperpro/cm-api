import { TrainingCreate } from '@/lib/Training/application/use-case/trainingCreate.uc'
import { TrainingFindById } from '@/lib/Training/application/use-case/trainingFindById.uc'
import { TrainingFindBySlug } from '@/lib/Training/application/use-case/trainingFindBySlug.uc'
import { TrainingGetAll } from '@/lib/Training/application/use-case/trainingGetAll.uc'
import { TrainingTursoRepository } from '@/lib/Training/infrastructure/repository/trainingTurso.repository'

const trainingRepository = new TrainingTursoRepository()

export const trainingServices = {
    create: new TrainingCreate(trainingRepository),
    getAll: new TrainingGetAll(trainingRepository),
    findById: new TrainingFindById(trainingRepository),
    findBySlug: new TrainingFindBySlug(trainingRepository),
}
