import { EnrollmentDetailDTO } from '../dto/enrollmentDetail.dto'

export interface EnrollmentGetAllParams {
    filters: {
        name?: string
        slug?: string
    }
}

export interface EnrollmentQueryRepository {
    findByTrainingDetailed(trainingId: string): Promise<EnrollmentDetailDTO[]>
    getAllDetailed(
        params: EnrollmentGetAllParams
    ): Promise<EnrollmentDetailDTO[]>
    getById(id: string): Promise<EnrollmentDetailDTO[]>
}
