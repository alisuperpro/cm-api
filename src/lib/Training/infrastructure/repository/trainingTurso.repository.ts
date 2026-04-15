import { TursoDatabase } from '@/lib/shared/insfrastructure/database/turso.db'
import { generateUUID } from '@/lib/shared/insfrastructure/utils/generateUUID'
import { Training } from '@/lib/Training/domain/entity/training.entity'
import { TrainingRepository } from '../../domain/repository/training.repository'

import { TrainingBanner } from '@/lib/Training/domain/value-objects/trainingBanner.vo'
import { TrainingCapacity } from '@/lib/Training/domain/value-objects/trainingCapacity.vo'
import { TrainingCreatedAt } from '@/lib/Training/domain/value-objects/trainingCreatedAt.vo'
import { TrainingDate } from '@/lib/Training/domain/value-objects/trainingDate.vo'
import { TrainingDescription } from '@/lib/Training/domain/value-objects/trainingDescription.vo'
import { TrainingEndTime } from '@/lib/Training/domain/value-objects/trainingEndTime.vo'
import { TrainingId } from '@/lib/Training/domain/value-objects/trainingId.vo'
import { TrainingLocation } from '@/lib/Training/domain/value-objects/trainingLocation.vo'
import { TrainingSlug } from '@/lib/Training/domain/value-objects/trainingSlug.vo'
import { TrainingStartTime } from '@/lib/Training/domain/value-objects/trainingStartTime.vo'
import { TrainingStatusId } from '@/lib/Training/domain/value-objects/trainingStatusId.vo'
import { TrainingTitle } from '@/lib/Training/domain/value-objects/trainingTitle.vo'
import { TrainingTypeId } from '@/lib/Training/domain/value-objects/trainingTypeId.vo'

import { TrainingStatus } from '@/lib/Training/domain/entity/trainingStatus.entity'
import { TrainingType } from '@/lib/Training/domain/entity/trainingType.entity'
import { TrainingStatusStatus } from '@/lib/Training/domain/value-objects/trainingStatus/trainingStatusStatus.vo'
import { TrainingTypeType } from '@/lib/Training/domain/value-objects/trainingType/trainingTypeType.vo'
import { TrainingTypeSlug } from '@/lib/Training/domain/value-objects/trainingType/trainingTypeSlug.vo'
import { QueryBuilder } from '@/lib/shared/insfrastructure/utils/queryBuilder'

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
    type_type: string
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
        try {
            const builder = new QueryBuilder(this.tableName)

            builder
                .select([
                    'training.id',
                    'title',
                    'date',
                    'location',
                    'status_id',
                    'training_status.status AS status_name',
                    'training.slug AS training_slug',
                    'training.id AS training_id',
                    'description',
                    'created_at',
                    'start_time',
                    'end_time',
                    'banner',
                    'capacity',
                    'type',
                    'training.slug',
                    'training_type.id AS type_id',
                    'training_type.type AS type_type',
                    'training_type.slug AS type_slug',
                ])
                .join(
                    'training_status',
                    'training.status_id = training_status.id'
                )
                .join('training_type', 'training.type_id = training_type.id')
                .where('training.id', id.value)

            const query = {
                sql: builder.build().sql,
                args: builder.build().args,
            }

            const result = await this.db.execute(query)
            const row = result.rows[0]

            if (!row) return null

            return this.mapToDomain(row as unknown as TrainingTurso)
        } catch (err) {
            console.log(err)
            return null
        }
    }

    async getAll(): Promise<Training[]> {
        const builder = new QueryBuilder(this.tableName)

        builder
            .select([
                'training.id',
                'title',
                'date',
                'location',
                'status_id',
                'training_status.status AS status_name',
                'training.slug AS training_slug',
                'training.id AS training_id',
                'description',
                'created_at',
                'start_time',
                'end_time',
                'banner',
                'capacity',
                'type',
                'training.slug',
                'training_type.id AS type_id',
                'training_type.type AS type_type',
                'training_type.slug AS type_slug',
            ])
            .join('training_status', 'training.status_id = training_status.id')
            .join('training_type', 'training.type_id = training_type.id')
        const query = {
            sql: builder.build().sql,
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
                new TrainingTypeType(row.type_type),
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
