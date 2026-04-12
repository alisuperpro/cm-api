import { Enrollment } from '../../domain/entity/enrollment.entity'
import { EnrollmentRepository } from '../../domain/repository/enrollment.repository'
import { EnrollmentAdditionalInfo } from '../../domain/value-objects/enrollmentAdditionalInfo.vo'
import { EnrollmentCertificateReceived } from '../../domain/value-objects/enrollmentCertificateReceived.vo'
import { EnrollmentCreatedAt } from '../../domain/value-objects/enrollmentCreatedAt.vo'
import { EnrollmentExperience } from '../../domain/value-objects/enrollmentExperience.vo'
import { EnrollmentHowFind } from '../../domain/value-objects/enrollmentHowFind.vo'
import { EnrollmentId } from '../../domain/value-objects/enrollmentId.vo'
import { EnrollmentIsArrived } from '../../domain/value-objects/enrollmentIsArrived.vo'
import { EnrollmentPayImg } from '../../domain/value-objects/enrollmentPayImg.vo'
import { EnrollmentPayRef } from '../../domain/value-objects/enrollmentPayRef.vo'
import { EnrollmentTrainingId } from '../../domain/value-objects/enrollmentTrainingId.vo'
import { EnrollmentUserId } from '../../domain/value-objects/enrollmentUserId.vo'

export class EnrollmentCreate {
    constructor(private repo: EnrollmentRepository) {}

    async run(input: any) {
        const enrollment = new Enrollment(
            new EnrollmentId(input.id),
            new EnrollmentTrainingId(input.trainingId),
            new EnrollmentUserId(input.userId),
            new EnrollmentHowFind(input.howFind),
            new EnrollmentExperience(input.experience),
            new EnrollmentAdditionalInfo(input.additionalInfo),
            new EnrollmentPayRef(input.payRef),
            new EnrollmentPayImg(input.payImg),
            new EnrollmentIsArrived(input.isArrived),
            new EnrollmentCertificateReceived(input.certificateReceived),
            new EnrollmentCreatedAt(input.createdAt)
        )

        await this.repo.save(enrollment)
    }
}
