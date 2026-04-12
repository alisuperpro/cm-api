import { Enrollment } from '../entity/enrollment.entity'
import { EnrollmentIsArrived } from '../value-objects/enrollmentIsArrived.vo'
import { EnrollmentPayConfirmed } from '../value-objects/enrollmentPayConfirmed.vo'
import { EnrollmentTrainingId } from '../value-objects/enrollmentTrainingId.vo'
import { EnrollmentUserId } from '../value-objects/enrollmentUserId.vo'

export interface EnrollmentRepository {
    save(enrollment: Enrollment): Promise<void>
    findByTraining(trainingId: string): Promise<Enrollment[]>
    updateIsArrived(
        userId: EnrollmentUserId,
        trainingId: EnrollmentTrainingId,
        isArrived: EnrollmentIsArrived
    ): Promise<void>
    updatePayConfirmed(
        userId: EnrollmentUserId,
        trainingId: EnrollmentTrainingId,
        payConfirmed: EnrollmentPayConfirmed
    ): Promise<void>
}
