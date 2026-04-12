import { EnrollmentQueryRepository } from '../query/enrollmentQuery.repository'

export class EnrollmentGetAll {
    constructor(private queryRepo: EnrollmentQueryRepository) {}

    async run() {
        return await this.queryRepo.getAllDetailed()
    }
}
