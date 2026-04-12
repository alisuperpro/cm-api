import { EnrollmentRepository } from '../../domain/repository/enrollment.repository'
import { EnrollmentCertificateReceived } from '../../domain/value-objects/enrollmentCertificateReceived.vo'
import { EnrollmentTrainingId } from '../../domain/value-objects/enrollmentTrainingId.vo'
import { EnrollmentUserId } from '../../domain/value-objects/enrollmentUserId.vo'
import { EnrollmentUpdateCertificateReceivedDTO } from '../dto/enrollmentUpdateCertificateReceived.dto'

export class EnrollmentUpdateCertificateReceived {
    constructor(private repo: EnrollmentRepository) {}

    async run(dto: EnrollmentUpdateCertificateReceivedDTO) {
        await this.repo.updateCertificateReceived(
            new EnrollmentUserId(dto.userId),
            new EnrollmentTrainingId(dto.trainingId),
            new EnrollmentCertificateReceived(dto.certificateReceived)
        )
    }
}
