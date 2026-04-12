import { TursoDatabase } from '../../../shared/insfrastructure/database/turso.db'
import { generateUUID } from '../../../shared/insfrastructure/utils/generateUUID'
import { Training } from '../../domain/entity/training.entity'
import { TrainingRepository } from '../../domain/repository/training.repository'

import { TrainingBanner } from '../../domain/value-objects/trainingBanner.vo'
import { TrainingCapacity } from '../../domain/value-objects/trainingCapacity.vo'
import { TrainingCreatedAt } from '../../domain/value-objects/trainingCreatedAt.vo'
import { TrainingDate } from '../../domain/value-objects/trainingDate.vo'
import { TrainingDescription } from '../../domain/value-objects/trainingDescription.vo'
import { TrainingEndTime } from '../../domain/value-objects/trainingEndTime.vo'
import { TrainingId } from '../../domain/value-objects/trainingId.vo'
import { TrainingLocation } from '../../domain/value-objects/trainingLocation.vo'
import { TrainingSlug } from '../../domain/value-objects/trainingSlug.vo'
import { TrainingStartTime } from '../../domain/value-objects/trainingStartTime.vo'
import { TrainingStatusId } from '../../domain/value-objects/trainingStatusId.vo'
import { TrainingTitle } from '../../domain/value-objects/trainingTitle.vo'
import { TrainingTypeId } from '../../domain/value-objects/trainingTypeId.vo'

import { TrainingStatus } from '../../domain/entity/trainingStatus.entity'
import { TrainingType } from '../../domain/entity/trainingType.entity'
import { TrainingStatusStatus } from '../../domain/value-objects/trainingStatus/trainingStatusStatus.vo'
import { TrainingTypeType } from '../../domain/value-objects/trainingType/trainingTypeType.vo'
import { TrainingTypeSlug } from '../../domain/value-objects/trainingType/trainingTypeSlug.vo'

type TrainingTurso = {
    id: string
    title: string
    description: string
    date: string
    status_id: string
    status_name: string
    location: string
    slug: string
    created_at: string
    start_time: string
    end_time: string
    banner: string
    capacity: number
    type_id: string
    type_name: string
    type_slug: string
}

export class TrainingTursoRepository implements TrainingRepository {
    private db = TursoDatabase.getInstance().getClient()
    private tableName = 'training'

    async create(training: Training): Promise<void> {
        const id = generateUUID()

        const query = {
            sql: `
                INSERT INTO ${this.tableName} 
                (id,title,date,status_id,location,start_time,end_time,banner,capacity,type_id,slug,description,created_at) 
                VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)
            `,
            args: [
                id,
                training.title.value,
                training.date.value,
                training.status.id.value,
                training.location.value,
                training.startTime.value,
                training.endTime.value,
                training.banner.value,
                training.capacity.value,
                training.type.id.value,
                training.slug.value,
                training.description.value,
                training.createdAt.value,
            ],
        }

        await this.db.execute(query)
    }

    async findById(id: TrainingId): Promise<Training | null> {
        const query = {
            sql: `
                SELECT 
                    t.*,
                    ts.status as status_name,
                    tt.type as type_name,
                    tt.slug as type_slug
                FROM ${this.tableName} t
                JOIN training_status ts ON ts.id = t.status_id
                JOIN training_type tt ON tt.id = t.type_id
                WHERE t.id = ?
            `,
            args: [id.value],
        }

        const result = await this.db.execute(query)
        const row = result.rows[0]

        if (!row) return null

        return this.mapToDomain(row as unknown as TrainingTurso)
    }

    async getAll(): Promise<Training[]> {
        const query = {
            sql: `
                SELECT 
                    t.*,
                    ts.status as status_name,
                    tt.type as type_name,
                    tt.slug as type_slug
                FROM ${this.tableName} t
                JOIN training_status ts ON ts.id = t.status_id
                JOIN training_type tt ON tt.id = t.type_id
            `,
        }

        const result = await this.db.execute(query)

        return result.rows.map((row) =>
            this.mapToDomain(row as unknown as TrainingTurso)
        )
    }

    private mapToDomain(row: TrainingTurso): Training {
        return new Training({
            id: new TrainingId(row.id),
            title: new TrainingTitle(row.title),
            description: new TrainingDescription(row.description),
            date: new TrainingDate(row.date),
            status: new TrainingStatus(
                new TrainingStatusId(row.status_id),
                new TrainingStatusStatus(row.status_name)
            ),
            type: new TrainingType(
                new TrainingTypeId(row.type_id),
                new TrainingTypeType(row.type_name),
                new TrainingTypeSlug(row.type_slug)
            ),
            location: new TrainingLocation(row.location),
            slug: new TrainingSlug(row.slug),
            createdAt: new TrainingCreatedAt(row.created_at),
            startTime: new TrainingStartTime(row.start_time),
            endTime: new TrainingEndTime(row.end_time),
            banner: new TrainingBanner(row.banner),
            capacity: new TrainingCapacity(row.capacity),
        })
    }
}
