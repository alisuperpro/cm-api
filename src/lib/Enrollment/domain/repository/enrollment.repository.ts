import { Enrollment } from '../entity/enrollment.entity'

export interface EnrollmentRepository {
    save(enrollment: Enrollment): Promise<void>
    findByTraining(trainingId: string): Promise<Enrollment[]>
}
