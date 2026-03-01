import { db } from '../db/db'
import { randomUUID } from 'node:crypto'

export class TrainingModel {
    static tableName = 'training'

    static async create({
        title,
        date,
        status,
        location,
    }: {
        title: string
        date: string
        status: string
        location: string
    }) {
        try {
            const id = randomUUID()
            await db.execute({
                sql: `INSERT INTO ${this.tableName} (id,title,date,status,location) VALUES (?,?,?,?,?)`,
                args: [id, title, date, status, location],
            })

            return [undefined, true]
        } catch (err) {
            return [err]
        }
    }

    static async byId({ id }: { id: string }) {
        try {
            const result = await db.execute({
                sql: `SELECT * FROM ${this.tableName} WHERE id = ?`,
                args: [id],
            })

            return [undefined, result.rows[0]]
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
