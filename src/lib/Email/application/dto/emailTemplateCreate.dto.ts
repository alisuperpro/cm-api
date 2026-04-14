export interface EmailTemplateCreateDTO {
    id: string
    title: string
    emailId: string
    html: string
    subject: string
    active: boolean
    slug: string
}
