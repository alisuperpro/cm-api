import { db } from '../db/db'
import { randomUUID } from 'node:crypto'
import { QueryBuilder } from '../utils/queryBuilder'
export class EmailSystemModel {
    static tableName = 'email_system'

    static async create({
        email,
        name,
        password,
        host,
        port,
        active,
    }: {
        email: string
        name: string
        password: string
        host: string
        port: number
        active: boolean
    }) {
        try {
            const id = randomUUID()
            await db.execute({
                sql: `INSERT INTO ${this.tableName} (id, email, name, password, host, port, active) VALUES (?,?,?,?,?,?,?)`,
                args: [id, email, name, password, host, port, active],
            })

            return [undefined, true]
        } catch (err) {
            return [err]
        }
    }

    static async all({ active, id }: { active?: boolean; id?: string }) {
        try {
            const builder = new QueryBuilder(`${this.tableName}`)
            builder.select(['*'])

            if (active) {
                builder.where('active', active)
            }

            if (id) {
                builder.where('id', id)
            }

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
