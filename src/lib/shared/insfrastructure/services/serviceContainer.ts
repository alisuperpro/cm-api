import { EmailSystemCreate } from '@/lib/Email/application/use-case/emailSystemCreate.uc'
import { EmailSystemFindById } from '@/lib/Email/application/use-case/emailSystemFindById.uc'
import { EmailSystemGetAll } from '@/lib/Email/application/use-case/emailSystemGetAll.uc'
import { EmailTemplateCreate } from '@/lib/Email/application/use-case/emailTemplateCreate.uc'
import { EmailTemplateGetAll } from '@/lib/Email/application/use-case/emailTemplateGetAll.uc'
import { EmailSystemTursoRepository } from '@/lib/Email/infrastructure/repository/emailSystem.repository'
import { EmailTemplateTursoRepository } from '@/lib/Email/infrastructure/repository/emailTemplate.repository'
import { EnrollmentCreate } from '@/lib/Enrollment/application/use-cases/enrollmentCreate.uc'
import { EnrollmentGetAll } from '@/lib/Enrollment/application/use-cases/enrollmentGetAll.uc'
import { EnrollmentGetById } from '@/lib/Enrollment/application/use-cases/enrollmentGetById.uc'
import { EnrollmentGetByTraining } from '@/lib/Enrollment/application/use-cases/enrollmentGetByTraining.uc'
import { EnrollmentUpdateCertificateReceived } from '@/lib/Enrollment/application/use-cases/enrollmentUpdateCertificateReceived.uc'
import { EnrollmentUpdateIsArrived } from '@/lib/Enrollment/application/use-cases/enrollmentUpdateIsArrived.uc'
import { EnrollmentUpdatePayConfirmed } from '@/lib/Enrollment/application/use-cases/enrollmentUpdatePayConfirmed.uc'
import { EnrollmentQueryRepositoryImpl } from '@/lib/Enrollment/infrastructure/query/enrollmentQuery.repository'
import { EnrollmentQueryTursoRepository } from '@/lib/Enrollment/infrastructure/repository/enrollment.repository'
import { TrainingStatusCreate } from '@/lib/Training/application/use-case/trainingStatus/trainingStatusCreate.uc'
import { TrainingStatusGetAll } from '@/lib/Training/application/use-case/trainingStatus/trainingStatusGetAll.uc'
import { TrainingTypeCreate } from '@/lib/Training/application/use-case/trainingType/trainingTypeCreate.uc'
import { TrainingTypeGetAll } from '@/lib/Training/application/use-case/trainingType/trainingTypeGetAll.uc'
import { TrainingStatusTursoRepository } from '@/lib/Training/infrastructure/repository/trainingStatus.repository'
import { TrainingTypeTursoRepository } from '@/lib/Training/infrastructure/repository/trainingType.repository'

import { userServices } from './user.services'
import { trainingServices } from './training.services'
import { adminUserServices } from './adminUser.services'

const trainingStatusRepository = new TrainingStatusTursoRepository()
const TrainingTypeRepository = new TrainingTypeTursoRepository()
const enrollmentRepository = new EnrollmentQueryTursoRepository()
const enrollmentQueryRepository = new EnrollmentQueryRepositoryImpl()
const emailSystemRepository = new EmailSystemTursoRepository()
const emailTemplateRepository = new EmailTemplateTursoRepository()

export const serviceContainer = {
    user: {
        ...userServices,
    },
    training: {
        ...trainingServices,
    },
    adminUser: {
        ...adminUserServices,
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
    emailSystem: {
        create: new EmailSystemCreate(emailSystemRepository),
        getAll: new EmailSystemGetAll(emailSystemRepository),
        findById: new EmailSystemFindById(emailSystemRepository),
    },
    emailTemplate: {
        create: new EmailTemplateCreate(emailTemplateRepository),
        getAll: new EmailTemplateGetAll(emailTemplateRepository),
    },
}
