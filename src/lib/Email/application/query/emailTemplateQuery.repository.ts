import { EmailTemplateDetailsDTO } from '../dto/emailTemplateDetails.dto'

export interface EmailTemplateParams {
    filters: {
        slug?: string
        active?: boolean
    }
}

export interface EmailTemplateQueryRepository {
    getAll(params: EmailTemplateParams): Promise<EmailTemplateDetailsDTO[]>
}
