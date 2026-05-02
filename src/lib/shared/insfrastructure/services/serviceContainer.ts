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

import { userServices } from './user.services'
import { trainingServices } from './training.services'
import { adminUserServices } from './adminUser.services'
import { trainingStatusServices } from './trainingStatus.services'
import { trainingTypeServices } from './trainingType.services'

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
        ...trainingStatusServices,
    },
    trainingType: {
        ...trainingTypeServices,
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
