import { userServices } from './user.services'
import { trainingServices } from './training.services'
import { employeeServices } from './employee.services'
import { trainingStatusServices } from './trainingStatus.services'
import { trainingTypeServices } from './trainingType.services'
import { enrollmentServices } from './enrollment.services'
import { emailSystemServices } from './emailSystem.services'
import { emailTemplateServices } from './emailTemplate.services'

export const serviceContainer = {
    user: {
        ...userServices,
    },
    training: {
        ...trainingServices,
    },
    employee: {
        ...employeeServices,
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
        ...emailSystemServices,
    },
    emailTemplate: {
        ...emailTemplateServices,
    },
}
