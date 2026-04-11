import { AdminUserCreate } from '../../../AdminUser/application/use-case/adminUserCreate.uc'
import { AdminUserFindById } from '../../../AdminUser/application/use-case/adminUserFindById.uc'
import { AdminUserGetAll } from '../../../AdminUser/application/use-case/adminUserGetAll.uc'
import { AdminUserUpdateNotoficationToken } from '../../../AdminUser/application/use-case/adminUserUpdateNotificationToken.uc'
import { AdminUserTursoRepository } from '../../../AdminUser/infrastructure/repository/adminUserTurso.repository'
import { TrainingCreate } from '../../../Training/application/use-case/trainingCreate.uc'
import { TrainingFindById } from '../../../Training/application/use-case/trainingFindById.uc'
import { TrainingGetAll } from '../../../Training/application/use-case/trainingGetAll.uc'
import { TrainingTursoRepository } from '../../../Training/infrastructure/repository/trainingTurso.repository'
import { UserCreate } from '../../../User/application/use-case/userCreate.uc'
import { UserFindById } from '../../../User/application/use-case/userFindById.uc'
import { UserGetAll } from '../../../User/application/use-case/userGetAll.uc'
import { UserTursoRepository } from '../../../User/infrastructure/repository/userTurso.repository'

const userRepository = new UserTursoRepository()
const trainingRepository = new TrainingTursoRepository()
const adminUserRepository = new AdminUserTursoRepository()

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
    adminUser: {
        create: new AdminUserCreate(adminUserRepository),
        getAll: new AdminUserGetAll(adminUserRepository),
        findById: new AdminUserFindById(adminUserRepository),
        updateNotificationToken: new AdminUserUpdateNotoficationToken(
            adminUserRepository
        ),
    },
}
