import { EmailSystemId } from '../value-objects/emailSystem/emailSystemId.vo'
import { EmailTemplateActive } from '../value-objects/emailTemplate/emailtemplateActive.vo'
import { EmailTemplateHtml } from '../value-objects/emailTemplate/emailTemplateHtml.vo'
import { EmailTemplateId } from '../value-objects/emailTemplate/emailTemplateId.vo'
import { EmailTemplateSlug } from '../value-objects/emailTemplate/emailTemplateSlug.vo'
import { EmailTemplateSubject } from '../value-objects/emailTemplate/emailTemplateSubject.vo'
import { EmailTemplateTitle } from '../value-objects/emailTemplate/emailTemplateTitle.vo'

export interface IEmailTemplate {
    id: EmailTemplateId
    title: EmailTemplateTitle
    emailId: EmailSystemId
    html: EmailTemplateHtml
    subject: EmailTemplateSubject
    active: EmailTemplateActive
    slug: EmailTemplateSlug
}

export class EmailTemplate {
    public readonly id: EmailTemplateId
    public readonly title: EmailTemplateTitle
    public readonly emailId: EmailSystemId
    public readonly html: EmailTemplateHtml
    public readonly subject: EmailTemplateSubject
    public readonly active: EmailTemplateActive
    public readonly slug: EmailTemplateSlug

    constructor(template: IEmailTemplate) {
        this.id = template.id
        this.title = template.title
        this.emailId = template.emailId
        this.html = template.html
        this.subject = template.subject
        this.active = template.active
        this.slug = template.slug
    }
}
