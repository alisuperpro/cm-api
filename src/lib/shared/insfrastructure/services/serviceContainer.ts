import { EmailSystemCreate } from '@/lib/Email/application/use-case/emailSystemCreate.uc'
import { EmailSystemFindById } from '@/lib/Email/application/use-case/emailSystemFindById.uc'
import { EmailSystemGetAll } from '@/lib/Email/application/use-case/emailSystemGetAll.uc'
import { EmailTemplateCreate } from '@/lib/Email/application/use-case/emailTemplateCreate.uc'
import { EmailTemplateGetAll } from '@/lib/Email/application/use-case/emailTemplateGetAll.uc'
import { EmailSystemTursoRepository } from '@/lib/Email/infrastructure/repository/emailSystem.repository'
import { EmailTemplateTursoRepository } from '@/lib/Email/infrastructure/repository/emailTemplate.repository'

import { userServices } from './user.services'
import { trainingServices } from './training.services'
import { adminUserServices } from './adminUser.services'
import { trainingStatusServices } from './trainingStatus.services'
import { trainingTypeServices } from './trainingType.services'
import { enrollmentServices } from './enrollment.services'

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
        ...enrollmentServices,
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
