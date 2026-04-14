import {
    EnrollmentGetAllParams,
    EnrollmentQueryRepository,
} from '../query/enrollmentQuery.repository'

export class EnrollmentGetAll {
    constructor(private queryRepo: EnrollmentQueryRepository) {}

    async run(params: EnrollmentGetAllParams) {
        return await this.queryRepo.getAllDetailed(params)
    }
}
