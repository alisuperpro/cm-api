import { EnrollmentAdditionalInfo } from '../value-objects/enrollmentAdditionalInfo.vo'
import { EnrollmentCertificateReceived } from '../value-objects/enrollmentCertificateReceived.vo'
import { EnrollmentCreatedAt } from '../value-objects/enrollmentCreatedAt.vo'
import { EnrollmentExperience } from '../value-objects/enrollmentExperience.vo'
import { EnrollmentHowFind } from '../value-objects/enrollmentHowFind.vo'
import { EnrollmentId } from '../value-objects/enrollmentId.vo'
import { EnrollmentIsArrived } from '../value-objects/enrollmentIsArrived.vo'
import { EnrollmentPayImg } from '../value-objects/enrollmentPayImg.vo'
import { EnrollmentPayRef } from '../value-objects/enrollmentPayRef.vo'
import { EnrollmentTrainingId } from '../value-objects/enrollmentTrainingId.vo'
import { EnrollmentUserId } from '../value-objects/enrollmentUserId.vo'

export class Enrollment {
    constructor(
        public readonly id: EnrollmentId,
        public readonly trainingId: EnrollmentTrainingId,
        public readonly userId: EnrollmentUserId,
        public readonly howFind: EnrollmentHowFind,
        public readonly experience: EnrollmentExperience,
        public readonly additionalInfo: EnrollmentAdditionalInfo,
        public readonly payRef: EnrollmentPayRef,
        public readonly payImg: EnrollmentPayImg,
        public isArrived: EnrollmentIsArrived,
        public certificateReceived: EnrollmentCertificateReceived,
        public readonly createdAt: EnrollmentCreatedAt
    ) {}

    markAsArrived() {
        this.isArrived.value = true
    }

    markCertificateReceived() {
        this.certificateReceived.value = true
    }
}
