import { EmailTemplateCreate } from '@/lib/Email/application/use-case/emailTemplateCreate.uc'
import { EmailTemplateGetAll } from '@/lib/Email/application/use-case/emailTemplateGetAll.uc'
import { EmailTemplateTursoRepository } from '@/lib/Email/infrastructure/repository/emailTemplate.repository'

const emailTemplateRepository = new EmailTemplateTursoRepository()

export const emailTemplateServices = {
    create: new EmailTemplateCreate(emailTemplateRepository),
    getAll: new EmailTemplateGetAll(emailTemplateRepository),
}
