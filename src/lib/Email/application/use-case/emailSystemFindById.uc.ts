import { EmailSystemQueryRepository } from '../query/emailSystemQuery.repository'

export class EmailSystemFindById {
    constructor(private repository: EmailSystemQueryRepository) {}

    async run(id: string) {
        const email = await this.repository.findById(id)

        if (!email) return null
        return email
    }
}
