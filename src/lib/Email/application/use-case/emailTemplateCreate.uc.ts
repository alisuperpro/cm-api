import { EmailTemplate } from '../../domain/entity/emailTemplate.entity'
import { EmailTemplateRepository } from '../../domain/repository/emailTemplate.repository'
import { EmailSystemId } from '../../domain/value-objects/emailSystem/emailSystemId.vo'
import { EmailTemplateActive } from '../../domain/value-objects/emailTemplate/emailtemplateActive.vo'
import { EmailTemplateHtml } from '../../domain/value-objects/emailTemplate/emailTemplateHtml.vo'
import { EmailTemplateId } from '../../domain/value-objects/emailTemplate/emailTemplateId.vo'
import { EmailTemplateSlug } from '../../domain/value-objects/emailTemplate/emailTemplateSlug.vo'
import { EmailTemplateSubject } from '../../domain/value-objects/emailTemplate/emailTemplateSubject.vo'
import { EmailTemplateTitle } from '../../domain/value-objects/emailTemplate/emailTemplateTitle.vo'
import { EmailTemplateCreateDTO } from '../dto/emailTemplateCreate.dto'

export class EmailTemplateCreate {
    constructor(private repository: EmailTemplateRepository) {}

    async run(emailTemplate: EmailTemplateCreateDTO) {
        const template = new EmailTemplate({
            id: new EmailTemplateId(emailTemplate.id),
            title: new EmailTemplateTitle(emailTemplate.title),
            emailId: new EmailSystemId(emailTemplate.emailId),
            html: new EmailTemplateHtml(emailTemplate.html),
            subject: new EmailTemplateSubject(emailTemplate.subject),
            active: new EmailTemplateActive(emailTemplate.active),
            slug: new EmailTemplateSlug(emailTemplate.slug),
        })

        return await this.repository.create(template)
    }
}
