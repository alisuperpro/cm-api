import { db } from '../db/db'
import { randomUUID } from 'node:crypto'
import { QueryBuilder } from '../utils/queryBuilder'

export class VideoUserModel {
    static tableName = 'video_user'
    static async create({
        userId,
        videoId,
        createdAt,
    }: {
        userId: string
        videoId: string
        createdAt: number
    }) {
        try {
            const id = randomUUID()
            await db.execute({
                sql: `INSERT INTO ${this.tableName} (id, user_id, video_id, created_at) VALUES (?,?,?,?)`,
                args: [id, userId, videoId, createdAt],
            })

            return [undefined, true]
        } catch (err) {
            return [err]
        }
    }

    static async all() {
        try {
            const builder = new QueryBuilder(this.tableName)

            builder
                .select(['*', 'u.id AS user_id', 'v.id AS video_id'])
                .join('video v', `${this.tableName}.video_id = v.id`)
                .join('user u', `${this.tableName}.user_id = u.id`)
            const result = await db.execute({
                sql: builder.build().sql,
            })

            return [undefined, result.rows]
        } catch (err) {
            return [err]
        }
    }

    static async byUserIdAndVideoId({
        userId,
        videoId,
    }: {
        userId: string
        videoId: string
    }) {
        try {
            const builder = new QueryBuilder(this.tableName)

            builder
                .select(['*', 'u.id AS user_id', 'v.id AS video_id'])
                .join('video v', `${this.tableName}.video_id = v.id`)
                .join('user u', `${this.tableName}.user_id = u.id`)
                .where(`${this.tableName}.user_id`, userId)
                .where(`${this.tableName}.video_id`, videoId)
            const result = await db.execute({
                sql: builder.build().sql,
            })

            return [undefined, result.rows]
        } catch (err) {
            return [err]
        }
    }

    static async byUserId({ userId }: { userId: string }) {
        try {
            const builder = new QueryBuilder(this.tableName)

            builder
                .select(['*', 'u.id AS user_id', 'v.id AS video_id'])
                .join('video v', `${this.tableName}.video_id = v.id`)
                .join('user u', `${this.tableName}.user_id = u.id`)
                .where(`${this.tableName}.user_id`, userId)
            const result = await db.execute({
                sql: builder.build().sql,
            })

            return [undefined, result.rows]
        } catch (err) {
            return [err]
        }
    }
}
