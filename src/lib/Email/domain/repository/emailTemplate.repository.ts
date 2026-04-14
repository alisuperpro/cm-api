import { EmailTemplate } from '../entity/emailTemplate.entity'

export interface EmailTemplateRepository {
    create(emailTemplate: EmailTemplate): Promise<void>
}
