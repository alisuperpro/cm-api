import { TursoDatabase } from '../../../shared/insfrastructure/database/turso.db'
import { EnrollmentDetailDTO } from '../../application/dto/enrollmentDetail.dto'
import { EnrollmentQueryRepository } from '../../application/query/enrollmentQuery.repository'

type EnrollmentTursoRaw = {
    // Enrollment fields
    id: string
    training_id: string
    user_id: string
    how_find: string
    experience: string
    additional_info: string | null
    pay_ref: string
    pay_img: string
    is_arrived: number | boolean
    certificate_received: number | boolean
    created_at: string

    // User fields
    full_name: string
    email: string
    doc_id: string
    phone: string
    birthdate: string
    occupation_status: string
    university: string
    how_find_us: string
    disability: string
    ig_username: string

    // Training fields
    title: string
    description: string
    date: string
    status_id: string
    location: string
    slug: string
    start_time: string
    end_time: string
    banner: string
    capacity: number
    type_id: string
}

export class EnrollmentQueryRepositoryImpl implements EnrollmentQueryRepository {
    private readonly db = TursoDatabase.getInstance().getClient()
    private readonly tableName = 'training_user'

    async findByTrainingDetailed(
        trainingId: string
    ): Promise<EnrollmentDetailDTO[]> {
        const query = {
            sql: `
                SELECT 
                    e.id,
                    e.training_id,
                    e.user_id,
                    e.how_find,
                    e.experience,
                    e.additional_info,
                    e.pay_ref,
                    e.pay_img,
                    e.is_arrived,
                    e.certificate_received,
                    e.created_at,
                    u.full_name,
                    u.email,
                    u.doc_id,
                    u.phone,
                    u.birthdate,
                    u.occupation_status,
                    u.university,
                    u.how_find_us,
                    u.disability,
                    u.ig_username,
                    t.title,
                    t.description,
                    t.date,
                    t.status_id,
                    t.location,
                    t.slug,
                    t.start_time,
                    t.end_time,
                    t.banner,
                    t.capacity,
                    t.type_id
                FROM ${this.tableName} e
                INNER JOIN user u ON u.id = e.user_id
                INNER JOIN training t ON t.id = e.training_id
                WHERE e.training_id = ?
            `,
            args: [trainingId],
        }

        const result = await this.db.execute(query)
        return result.rows.map((row) =>
            this.mapToDTO(row as unknown as EnrollmentTursoRaw)
        )
    }

    async getAllDetailed(): Promise<EnrollmentDetailDTO[]> {
        const query = {
            sql: `
                SELECT 
                    e.id,
                    e.training_id,
                    e.user_id,
                    e.how_find,
                    e.experience,
                    e.additional_info,
                    e.pay_ref,
                    e.pay_img,
                    e.is_arrived,
                    e.certificate_received,
                    e.created_at,
                    u.full_name,
                    u.email,
                    u.doc_id,
                    u.phone,
                    u.birthdate,
                    u.occupation_status,
                    u.university,
                    u.how_find_us,
                    u.disability,
                    u.ig_username,
                    t.title,
                    t.description,
                    t.date,
                    t.status_id,
                    t.location,
                    t.slug,
                    t.start_time,
                    t.end_time,
                    t.banner,
                    t.capacity,
                    t.type_id
                FROM ${this.tableName} e
                INNER JOIN user u ON u.id = e.user_id
                INNER JOIN training t ON t.id = e.training_id
            
            `,
        }

        const result = await this.db.execute(query)
        return result.rows.map((row) =>
            this.mapToDTO(row as unknown as EnrollmentTursoRaw)
        )
    }

    async getById(id: string): Promise<EnrollmentDetailDTO[]> {
        const query = {
            sql: `
            SELECT * FROM ${this.tableName} e
            INNER JOIN user u ON u.id = e.user_id
            INNER JOIN training t ON t.id = e.training_id
            WHERE e.id = ?`,
            args: [id],
        }

        const result = await this.db.execute(query)

        return result.rows.map((row) =>
            this.mapToDTO(row as unknown as EnrollmentTursoRaw)
        )
    }

    private mapToDTO(row: EnrollmentTursoRaw): EnrollmentDetailDTO {
        return {
            id: row.id,
            howFind: row.how_find,
            experience: row.experience,
            additionalInfo: row.additional_info,
            payRef: row.pay_ref,
            payImg: row.pay_img,
            isArrived: Boolean(row.is_arrived),
            certificateReceived: Boolean(row.certificate_received),
            createdAt: row.created_at,

            user: {
                id: row.user_id,
                full_name: row.full_name,
                email: row.email,
                doc_id: row.doc_id,
                phone: row.phone,
                birthdate: row.birthdate,
                occupation_status: row.occupation_status,
                university: row.university,
                how_find_us: row.how_find_us,
                disability: row.disability,
                ig_username: row.ig_username,
            },

            training: {
                id: row.training_id,
                title: row.title,
                description: row.description,
                date: row.date,
                status_id: row.status_id,
                location: row.location,
                slug: row.slug,
                created_at: row.created_at,
                start_time: row.start_time,
                end_time: row.end_time,
                banner: row.banner,
                capacity: row.capacity,
                type_id: row.type_id,
            },
        }
    }
}
