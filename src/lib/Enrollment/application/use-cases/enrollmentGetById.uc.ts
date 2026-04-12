import { EnrollmentQueryRepository } from '../query/enrollmentQuery.repository'

export class EnrollmentGetById {
    constructor(private repository: EnrollmentQueryRepository) {}

    async run(id: string) {
        const enrollment = await this.repository.getById(id)

        return enrollment
    }
}
