import { db } from '../db/db'
import { randomUUID } from 'node:crypto'

export class TrainingTypeModel {
    static tableName = 'training_type'

    static async create({ type, slug }: { type: string; slug: string }) {
        try {
            const id = randomUUID()
            await db.execute({
                sql: `INSERT INTO ${this.tableName} (id,type,slug) VALUES (?,?,?)`,
                args: [id, type, slug],
            })

            return [undefined, true]
        } catch (err) {
            return [err]
        }
    }

    static async all() {
        try {
            const result = await db.execute({
                sql: `SELECT * FROM ${this.tableName}`,
            })

            return [undefined, result.rows]
        } catch (err) {
            return [err]
        }
    }
}
