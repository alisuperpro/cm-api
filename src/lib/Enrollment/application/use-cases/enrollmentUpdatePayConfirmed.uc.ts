import { EnrollmentRepository } from '../../domain/repository/enrollment.repository'
import { EnrollmentPayConfirmed } from '../../domain/value-objects/enrollmentPayConfirmed.vo'
import { EnrollmentTrainingId } from '../../domain/value-objects/enrollmentTrainingId.vo'
import { EnrollmentUserId } from '../../domain/value-objects/enrollmentUserId.vo'
import { EnrollmentUpdatePayConfirmedDTO } from '../dto/enrollmentUpdatePayConfirmed.dto'

export class EnrollmentUpdatePayConfirmed {
    constructor(private repo: EnrollmentRepository) {}

    async run(dto: EnrollmentUpdatePayConfirmedDTO) {
        await this.repo.updatePayConfirmed(
            new EnrollmentUserId(dto.userId),
            new EnrollmentTrainingId(dto.trainingId),
            new EnrollmentPayConfirmed(dto.payConfirmed)
        )
    }
}
