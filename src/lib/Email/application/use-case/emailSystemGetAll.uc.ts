import { EmailSystemQueryRepository } from '../query/emailSystemQuery.repository'

export class EmailSystemGetAll {
    constructor(private repository: EmailSystemQueryRepository) {}

    async run() {
        return await this.repository.getAll()
    }
}
