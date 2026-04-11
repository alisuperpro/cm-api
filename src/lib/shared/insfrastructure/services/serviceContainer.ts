import { UserCreate } from '../../../User/application/use-case/userCreate.uc'
import { UserFindById } from '../../../User/application/use-case/userFindById.uc'
import { UserGetAll } from '../../../User/application/use-case/userGetAll.uc'
import { UserTursoRepository } from '../../../User/infrastruture/repository/userTurso.repository'

const userRepository = new UserTursoRepository()

export const serviceContainer = {
    user: {
        create: new UserCreate(userRepository),
        getAll: new UserGetAll(userRepository),
        findById: new UserFindById(userRepository),
    },
}
