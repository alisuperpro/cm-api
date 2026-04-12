import { EnrollmentQueryRepository } from '../query/enrollmentQuery.repository'

export class EnrollmentGetByTraining {
    constructor(private queryRepo: EnrollmentQueryRepository) {}

    async run(trainingId: string) {
        return await this.queryRepo.findByTrainingDetailed(trainingId)
    }
}
