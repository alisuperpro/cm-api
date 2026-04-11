import { TrainingCreate } from '../../../Training/application/use-case/trainingCreate.uc'
import { TrainingFindById } from '../../../Training/application/use-case/trainingFindById.uc'
import { TrainingGetAll } from '../../../Training/application/use-case/trainingGetAll.uc'
import { TrainingTursoRepository } from '../../../Training/infrastruture/repository/trainingTurso.repository'
import { UserCreate } from '../../../User/application/use-case/userCreate.uc'
import { UserFindById } from '../../../User/application/use-case/userFindById.uc'
import { UserGetAll } from '../../../User/application/use-case/userGetAll.uc'
import { UserTursoRepository } from '../../../User/infrastruture/repository/userTurso.repository'

const userRepository = new UserTursoRepository()
const trainingRepository = new TrainingTursoRepository()

export const serviceContainer = {
    user: {
        create: new UserCreate(userRepository),
        getAll: new UserGetAll(userRepository),
        findById: new UserFindById(userRepository),
    },
    training: {
        create: new TrainingCreate(trainingRepository),
        getAll: new TrainingGetAll(trainingRepository),
        findById: new TrainingFindById(trainingRepository),
    },
}
