export interface EmailTemplateDetailsDTO {
    id: string
    title: string
    emailId: string
    html: string
    subject: string
    active: boolean
    slug: string
    email: {
        id: string
        email: string
        name: string
        host: string
        port: number
        active: boolean
    }
}
