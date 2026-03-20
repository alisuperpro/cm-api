import { db } from '../db/db'
import { randomUUID } from 'node:crypto'
import { QueryBuilder } from '../utils/queryBuilder'

export class TrainingModel {
    static tableName = 'training'

    static async create({
        title,
        date,
        statusId,
        location,
        startTime,
        endTime,
        banner,
        capacity,
        typeId,
        slug,
        description,
        createdAt,
    }: {
        title: string
        date: string
        statusId: string
        location: string
        startTime: string
        endTime: string
        banner: string
        capacity: number
        typeId: string
        slug: string
        description?: string
        createdAt: string
    }) {
        try {
            const id = randomUUID()
            await db.execute({
                sql: `INSERT INTO ${this.tableName} (id,title,date,status_id,location,start_time,end_time,banner,capacity, type_id, slug, description, created_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`,
                args: [
                    id,
                    title,
                    date,
                    statusId,
                    location,
                    startTime,
                    endTime,
                    banner,
                    capacity,
                    typeId,
                    slug,
                    description ? description : null,
                    createdAt,
                ],
            })

            return [undefined, true]
        } catch (err) {
            return [err]
        }
    }

    static async byId({ id }: { id: string }) {
        try {
            const builder = new QueryBuilder(this.tableName)

            builder
                .select([
                    'title',
                    'date',
                    'location',
                    'status_id',
                    'training_status.status AS status',
                    'training.slug AS training_slug',
                    'description',
                    'created_at',
                    'start_time',
                    'end_time',
                    'banner',
                    'capacity',
                    'type',
                    'training_type.slug AS training_type_slug',
                ])
                .join(
                    'training_status',
                    'training.status_id = training_status.id'
                )
                .join('training_type', 'training.type_id = training_type.id')
                .where('training.id', id)
            const result = await db.execute({
                sql: builder.build().sql,
                args: builder.build().args,
            })

            return [undefined, result.rows[0]]
        } catch (err) {
            return [err]
        }
    }

    static async all() {
        try {
            const builder = new QueryBuilder(this.tableName)

            builder
                .select([
                    'title',
                    'date',
                    'location',
                    'status_id',
                    'training_status.status AS status',
                    'training.slug AS training_slug',
                    'description',
                    'created_at',
                    'start_time',
                    'end_time',
                    'banner',
                    'capacity',
                    'training_type.type',
                    'training_type.slug AS training_type_slug',
                ])
                .join(
                    'training_status',
                    'training.status_id = training_status.id'
                )
                .join('training_type', 'training.type_id = training_type.id')
            const result = await db.execute({
                sql: builder.build().sql,
            })

            return [undefined, result.rows]
        } catch (err) {
            return [err]
        }
    }
}
