import {
    EmailTemplateParams,
    EmailTemplateQueryRepository,
} from '../query/emailTemplateQuery.repository'

export class EmailTemplateGetAll {
    constructor(private repository: EmailTemplateQueryRepository) {}

    async run(params: EmailTemplateParams) {
        return await this.repository.getAll(params)
    }
}
