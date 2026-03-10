import { db } from '../db/db'
import { randomUUID } from 'node:crypto'
import { QueryBuilder } from '../utils/queryBuilder'

export class VisibilityTypeModel {
    static tableName = 'visibility_type'

    static async create({
        name,
        description = null,
    }: {
        name: string
        description?: string | null
    }) {
        try {
            const id = randomUUID()
            await db.execute({
                sql: `INSERT INTO ${this.tableName} (id, name, description) VALUES (?,?,?)`,
                args: [id, name, description],
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
