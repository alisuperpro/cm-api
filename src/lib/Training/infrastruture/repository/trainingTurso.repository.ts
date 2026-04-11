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

type TrainingTurso = {
    id: string
    title: string
    description: string
    date: string
    status_id: string
    location: string
    slug: string
    created_at: string
    start_time: string
    end_time: string
    banner: string
    capacity: number
    type_id: string
}

export class TrainingTursoRepository implements TrainingRepository {
    private db = TursoDatabase.getInstance().getClient()
    private tableName = 'training'

    async create(training: Training): Promise<void> {
        const id = generateUUID()

        const query = {
            sql: `INSERT INTO ${this.tableName} (id,title,date,status_id,location,start_time,end_time,banner,capacity, type_id, slug, description, created_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            args: [
                id,
                training.title.value,
                training.date.value,
                training.statusId.value,
                training.location.value,
                training.startTime.value,
                training.endTime.value,
                training.banner.value,
                training.capacity.value,
                training.typeId.value,
                training.slug.value,
                training.description.value,
                training.createdAt.value,
            ],
        }

        await this.db.execute(query)
    }

    async findById(id: TrainingId): Promise<Training | null> {
        const query = {
            sql: `SELECT * FROM ${this.tableName} WHERE id = ?`,
            args: [id.value],
        }

        const result = await this.db.execute(query)

        const row = result.rows[0]

        return this.mapToDomain(row as unknown as TrainingTurso)
    }

    async getAll(): Promise<Training[]> {
        const query = {
            sql: `SELECT * FROM ${this.tableName}`,
        }

        const result = await this.db.execute(query)

        return result.rows.map((row) =>
            this.mapToDomain(row as unknown as TrainingTurso)
        )
    }

    private mapToDomain(training: TrainingTurso) {
        return new Training({
            id: new TrainingId(training.id),
            title: new TrainingTitle(training.title),
            description: new TrainingDescription(training.description),
            date: new TrainingDate(training.date),
            statusId: new TrainingStatusId(training.status_id),
            location: new TrainingLocation(training.location),
            slug: new TrainingSlug(training.slug),
            createdAt: new TrainingCreatedAt(training.created_at),
            startTime: new TrainingStartTime(training.start_time),
            endTime: new TrainingEndTime(training.end_time),
            banner: new TrainingBanner(training.banner),
            capacity: new TrainingCapacity(training.capacity),
            typeId: new TrainingTypeId(training.type_id),
        })
    }
}
