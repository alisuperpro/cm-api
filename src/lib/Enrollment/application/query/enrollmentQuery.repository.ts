import { EnrollmentDetailDTO } from '../dto/enrollmentDetail.dto'

export interface EnrollmentQueryRepository {
    findByTrainingDetailed(trainingId: string): Promise<EnrollmentDetailDTO[]>
    getAllDetailed(): Promise<EnrollmentDetailDTO[]>
    getById(id: string): Promise<EnrollmentDetailDTO[]>
}
