/* import { db } from '../db/db'
import { randomUUID } from 'node:crypto'
import { QueryBuilder } from '../utils/queryBuilder'

export class VideoCategoryModel {
    static tableName = 'video_category'

    static async create({
        name,
        description,
        slug,
        createdAt,
    }: {
        name: string
        description?: string
        slug: string
        createdAt: number
    }) {
        try {
            const id = randomUUID()
            await db.execute({
                sql: `INSERT INTO ${this.tableName} (id,name,description,slug,created_at) VALUES (?,?,?,?,?)`,
                args: [
                    id,
                    name,
                    description ? description : null,
                    slug,
                    createdAt,
                ],
            })

            return [undefined, true]
        } catch (err) {
            return [err]
        }
    }

    static async all() {
        try {
            const builder = new QueryBuilder(this.tableName)

            builder.select('*')

            const result = await db.execute({
                sql: builder.build().sql,
                args: builder.build().args,
            })

            return [undefined, result.rows]
        } catch (err) {
            return [err]
        }
    }
}
 */
