import { EnrollmentCreate } from '@/lib/Enrollment/application/use-cases/enrollmentCreate.uc'
import { EnrollmentGetAll } from '@/lib/Enrollment/application/use-cases/enrollmentGetAll.uc'
import { EnrollmentGetById } from '@/lib/Enrollment/application/use-cases/enrollmentGetById.uc'
import { EnrollmentGetByTraining } from '@/lib/Enrollment/application/use-cases/enrollmentGetByTraining.uc'
import { EnrollmentUpdateCertificateReceived } from '@/lib/Enrollment/application/use-cases/enrollmentUpdateCertificateReceived.uc'
import { EnrollmentUpdateIsArrived } from '@/lib/Enrollment/application/use-cases/enrollmentUpdateIsArrived.uc'
import { EnrollmentUpdatePayConfirmed } from '@/lib/Enrollment/application/use-cases/enrollmentUpdatePayConfirmed.uc'
import { EnrollmentQueryRepositoryImpl } from '@/lib/Enrollment/infrastructure/query/enrollmentQuery.repository'
import { EnrollmentQueryTursoRepository } from '@/lib/Enrollment/infrastructure/repository/enrollment.repository'

const enrollmentRepository = new EnrollmentQueryTursoRepository()
const enrollmentQueryRepository = new EnrollmentQueryRepositoryImpl()

export const enrollmentServices = {
    create: new EnrollmentCreate(enrollmentRepository),
    getByTrainingId: new EnrollmentGetByTraining(enrollmentQueryRepository),
    getAll: new EnrollmentGetAll(enrollmentQueryRepository),
    getById: new EnrollmentGetById(enrollmentQueryRepository),
    updateIsArrived: new EnrollmentUpdateIsArrived(enrollmentRepository),
    updatePayConfirmed: new EnrollmentUpdatePayConfirmed(enrollmentRepository),
    updateCertificateReceived: new EnrollmentUpdateCertificateReceived(
        enrollmentRepository
    ),
}
