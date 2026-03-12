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
    }: {
        title: string
        date: string
        statusId: string
        location: string
        startTime: string
        endTime: string
    }) {
        try {
            const id = randomUUID()
            await db.execute({
                sql: `INSERT INTO ${this.tableName} (id,title,date,status_id,location,start_time,end_time) VALUES (?,?,?,?,?,?,?)`,
                args: [id, title, date, statusId, location, startTime, endTime],
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
                    'slug',
                    'description',
                    'created_at',
                    'start_time',
                    'end_time',
                ])
                .join(
                    'training_status',
                    'training.status_id = training_status.id'
                )
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
                .select('*')
                .join(
                    'training_status',
                    'training.status_id = training_status.id'
                )
            const result = await db.execute({
                sql: builder.build().sql,
            })

            return [undefined, result.rows]
        } catch (err) {
            return [err]
        }
    }
}
