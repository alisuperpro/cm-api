import { AdminUserCreate } from '../../../AdminUser/application/use-case/adminUserCreate.uc'
import { AdminUserFindById } from '../../../AdminUser/application/use-case/adminUserFindById.uc'
import { AdminUserGetAll } from '../../../AdminUser/application/use-case/adminUserGetAll.uc'
import { AdminUserUpdateNotoficationToken } from '../../../AdminUser/application/use-case/adminUserUpdateNotificationToken.uc'
import { AdminUserTursoRepository } from '../../../AdminUser/infrastructure/repository/adminUserTurso.repository'
import { EnrollmentCreate } from '../../../Enrollment/application/use-cases/enrollmentCreate.uc'
import { EnrollmentGetAll } from '../../../Enrollment/application/use-cases/enrollmentGetAll.uc'
import { EnrollmentGetById } from '../../../Enrollment/application/use-cases/enrollmentGetById.uc'
import { EnrollmentGetByTraining } from '../../../Enrollment/application/use-cases/enrollmentGetByTraining.uc'
import { EnrollmentUpdateCertificateReceived } from '../../../Enrollment/application/use-cases/enrollmentUpdateCertificateReceived.uc'
import { EnrollmentUpdateIsArrived } from '../../../Enrollment/application/use-cases/enrollmentUpdateIsArrived.uc'
import { EnrollmentUpdatePayConfirmed } from '../../../Enrollment/application/use-cases/enrollmentUpdatePayConfirmed.uc'
import { EnrollmentQueryRepositoryImpl } from '../../../Enrollment/infrastructure/query/enrollmentQuery.repository'
import { EnrollmentQueryTursoRepository } from '../../../Enrollment/infrastructure/repository/enrollment.repository'
import { TrainingCreate } from '../../../Training/application/use-case/trainingCreate.uc'
import { TrainingFindById } from '../../../Training/application/use-case/trainingFindById.uc'
import { TrainingGetAll } from '../../../Training/application/use-case/trainingGetAll.uc'
import { TrainingStatusCreate } from '../../../Training/application/use-case/trainingStatus/trainingStatusCreate.uc'
import { TrainingStatusGetAll } from '../../../Training/application/use-case/trainingStatus/trainingStatusGetAll.uc'
import { TrainingTypeCreate } from '../../../Training/application/use-case/trainingType/trainingTypeCreate.uc'
import { TrainingTypeGetAll } from '../../../Training/application/use-case/trainingType/trainingTypeGetAll.uc'
import { TrainingStatusTursoRepository } from '../../../Training/infrastructure/repository/trainingStatus.repository'
import { TrainingTursoRepository } from '../../../Training/infrastructure/repository/trainingTurso.repository'
import { TrainingTypeTursoRepository } from '../../../Training/infrastructure/repository/trainingType.repository'
import { UserCreate } from '../../../User/application/use-case/userCreate.uc'
import { UserFindById } from '../../../User/application/use-case/userFindById.uc'
import { UserGetAll } from '../../../User/application/use-case/userGetAll.uc'
import { UserTursoRepository } from '../../../User/infrastructure/repository/userTurso.repository'

const userRepository = new UserTursoRepository()
const trainingRepository = new TrainingTursoRepository()
const adminUserRepository = new AdminUserTursoRepository()
const trainingStatusRepository = new TrainingStatusTursoRepository()
const TrainingTypeRepository = new TrainingTypeTursoRepository()
const enrollmentRepository = new EnrollmentQueryTursoRepository()

const enrollmentQueryRepository = new EnrollmentQueryRepositoryImpl()

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
    trainingStatus: {
        create: new TrainingStatusCreate(trainingStatusRepository),
        getAll: new TrainingStatusGetAll(trainingStatusRepository),
    },
    trainingType: {
        create: new TrainingTypeCreate(TrainingTypeRepository),
        getAll: new TrainingTypeGetAll(TrainingTypeRepository),
    },
    enrollment: {
        create: new EnrollmentCreate(enrollmentRepository),
        getByTraining: new EnrollmentGetByTraining(enrollmentQueryRepository),
        getAll: new EnrollmentGetAll(enrollmentQueryRepository),
        getById: new EnrollmentGetById(enrollmentQueryRepository),
        updateIsArrived: new EnrollmentUpdateIsArrived(enrollmentRepository),
        updatePayConfirmed: new EnrollmentUpdatePayConfirmed(
            enrollmentRepository
        ),
        updateCertificateReceived: new EnrollmentUpdateCertificateReceived(
            enrollmentRepository
        ),
    },
}
