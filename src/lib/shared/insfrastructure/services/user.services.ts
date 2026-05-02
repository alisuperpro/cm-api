import { UserCreate } from '@/lib/User/application/use-case/userCreate.uc'
import { UserFindById } from '@/lib/User/application/use-case/userFindById.uc'
import { UserGetAll } from '@/lib/User/application/use-case/userGetAll.uc'
import { UserTursoRepository } from '@/lib/User/infrastructure/repository/userTurso.repository'

const userRepository = new UserTursoRepository()

export const userServices = {
    create: new UserCreate(userRepository),
    getAll: new UserGetAll(userRepository),
    findById: new UserFindById(userRepository),
}
