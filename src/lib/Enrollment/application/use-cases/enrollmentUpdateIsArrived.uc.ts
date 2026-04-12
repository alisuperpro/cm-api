import { EnrollmentRepository } from '../../domain/repository/enrollment.repository'
import { EnrollmentIsArrived } from '../../domain/value-objects/enrollmentIsArrived.vo'
import { EnrollmentTrainingId } from '../../domain/value-objects/enrollmentTrainingId.vo'
import { EnrollmentUserId } from '../../domain/value-objects/enrollmentUserId.vo'
import { EnrollmentUpdateIsArrivedDTO } from '../dto/enrollmentUpdateIsArrived.dto'

export class EnrollmentUpdateIsArrived {
    constructor(private repo: EnrollmentRepository) {}

    async run(dto: EnrollmentUpdateIsArrivedDTO) {
        await this.repo.updateIsArrived(
            new EnrollmentUserId(dto.userId),
            new EnrollmentTrainingId(dto.trainingId),
            new EnrollmentIsArrived(dto.isArrived)
        )
    }
}
