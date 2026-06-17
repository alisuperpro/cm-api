import { EnrollmentRepository } from '../../domain/repository/enrollment.repository'
import { Enrollment } from '../../domain/entity/enrollment.entity'
import { TursoDatabase } from '../../../shared/insfrastructure/database/turso.db'
import { EnrollmentId } from '../../domain/value-objects/enrollmentId.vo'
import { EnrollmentTrainingId } from '../../domain/value-objects/enrollmentTrainingId.vo'
import { EnrollmentUserId } from '../../domain/value-objects/enrollmentUserId.vo'
import { EnrollmentHowFind } from '../../domain/value-objects/enrollmentHowFind.vo'
import { EnrollmentExperience } from '../../domain/value-objects/enrollmentExperience.vo'
import { EnrollmentAdditionalInfo } from '../../domain/value-objects/enrollmentAdditionalInfo.vo'
import { EnrollmentPayRef } from '../../domain/value-objects/enrollmentPayRef.vo'
import { EnrollmentPayImg } from '../../domain/value-objects/enrollmentPayImg.vo'
import { EnrollmentIsArrived } from '../../domain/value-objects/enrollmentIsArrived.vo'
import { EnrollmentCertificateReceived } from '../../domain/value-objects/enrollmentCertificateReceived.vo'
import { EnrollmentCreatedAt } from '../../domain/value-objects/enrollmentCreatedAt.vo'
import { EnrollmentPayConfirmed } from '../../domain/value-objects/enrollmentPayConfirmed.vo'

type EnrollmentTurso = {
    id: string
    training_id: string
    user_id: string
    how_find: string
    experience: string
    additional_info: string | null
    pay_ref: string
    pay_img: string
    is_arrived: boolean
    certificate_received: boolean
    pay_confirmed: boolean
    created_at: string
}

export class EnrollmentQueryTursoRepository implements EnrollmentRepository {
    private db = TursoDatabase.getInstance().getClient()
    private tableName = 'training_user'
    async save(enrollment: Enrollment): Promise<void> {
        const query = {
            sql: `
            INSERT INTO ${this.tableName} (
                id, training_id, user_id, how_find, experience,
                additional_info, pay_ref, pay_img,
                is_arrived, certificate_received, created_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
            args: [
                enrollment.id.value,
                enrollment.trainingId.value,
                enrollment.userId.value,
                enrollment.howFind.value,
                enrollment.experience.value,
                enrollment.additionalInfo.value
                    ? enrollment.additionalInfo.value
                    : null,
                enrollment.payRef.value,
                enrollment.payImg.value,
                enrollment.isArrived.value,
                enrollment.certificateReceived.value,
                enrollment.createdAt.value,
            ],
        }

        await this.db.execute(query)
    }

    async findByTrainingId(trainingId: string): Promise<Enrollment | null> {
        const result = await this.db.execute(
            `SELECT * FROM training_user WHERE training_id = ?`,
            [trainingId]
        )

        return this.mapToDomain(result.rows[0] as unknown as EnrollmentTurso)
    }

    async updateIsArrived(
        userId: EnrollmentUserId,
        trainingId: EnrollmentTrainingId,
        isArrived: EnrollmentIsArrived
    ): Promise<void> {
        const query = {
            sql: `UPDATE ${this.tableName} SET is_arrived = ?  WHERE user_id = ? AND training_id = ?`,
            args: [isArrived.value, userId.value, trainingId.value],
        }

        await this.db.execute(query)
    }

    async updatePayConfirmed(
        userId: EnrollmentUserId,
        trainingId: EnrollmentTrainingId,
        payConfirmed: EnrollmentPayConfirmed
    ): Promise<void> {
        const query = {
            sql: `UPDATE ${this.tableName} SET pay_confirmed = ?  WHERE user_id = ? AND training_id = ?`,
            args: [payConfirmed.value, userId.value, trainingId.value],
        }

        await this.db.execute(query)
    }

    async updateCertificateReceived(
        userId: EnrollmentUserId,
        trainingId: EnrollmentTrainingId,
        certificareReceived: EnrollmentCertificateReceived
    ): Promise<void> {
        const query = {
            sql: `UPDATE ${this.tableName} SET certificate_received = ?  WHERE user_id = ? AND training_id = ?`,
            args: [certificareReceived.value, userId.value, trainingId.value],
        }

        await this.db.execute(query)
    }

    private mapToDomain(row: EnrollmentTurso) {
        return new Enrollment(
            new EnrollmentId(row.id),
            new EnrollmentTrainingId(row.training_id),
            new EnrollmentUserId(row.user_id),
            new EnrollmentHowFind(row.how_find),
            new EnrollmentExperience(row.experience),
            new EnrollmentAdditionalInfo(row.additional_info),
            new EnrollmentPayRef(row.pay_ref),
            new EnrollmentPayImg(row.pay_img),
            new EnrollmentIsArrived(row.is_arrived),
            new EnrollmentCertificateReceived(row.certificate_received),
            new EnrollmentPayConfirmed(row.pay_confirmed),
            new EnrollmentCreatedAt(row.created_at)
        )
    }
}
