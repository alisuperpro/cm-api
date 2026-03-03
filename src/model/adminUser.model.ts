import { db } from '../db/db'

export class AdminUserModel {
    static tableName = 'admin_user'

    static async create({
        id,
        role,
        name,
    }: {
        id: string
        role: string
        name: string
    }) {
        try {
            await db.execute({
                sql: `INSERT INTO ${this.tableName} (id, role, name) VALUES (?,?,?)`,
                args: [id, role, name],
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

    static async updateNotificatonToken({
        id,
        token,
    }: {
        id: string
        token: string
    }) {
        try {
            const result = await db.execute({
                sql: `UPDATE ${this.tableName} SET notification_token = ? WHERE id = ?`,
                args: [token, id],
            })

            return [undefined, true]
        } catch (err) {
            return [err]
        }
    }
}
