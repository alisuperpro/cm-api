import { db } from '../db/db'
import { AdminUserType } from '../types/admin.types'
import { DbResult, DbResultArray } from '../types/utils.types'

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

    static async all(): Promise<DbResultArray<AdminUserType>> {
        try {
            const result = await db.execute({
                sql: `SELECT * FROM ${this.tableName}`,
            })

            if (!result.rows) {
                return [null, []]
            }

            const admins = result.rows.map((row: any) =>
                this.mapToAdminUser(row)
            )
            return [null, admins]
        } catch (error) {
            console.error('Error in AdminUserModel.all:', error)
            return [error as Error, null]
        }
    }

    static async byId({
        id,
    }: {
        id: string
    }): Promise<DbResult<AdminUserType>> {
        try {
            const result = await db.execute({
                sql: `SELECT * FROM ${this.tableName} WHERE id = ?`,
                args: [id],
            })

            if (!result.rows || result.rows.length === 0) {
                return [null, null] // No encontrado, pero sin error
            }

            const admin = this.mapToAdminUser(result.rows[0])
            return [null, admin]
        } catch (error) {
            console.error('Error in AdminUserModel.byId:', error)
            return [error as Error, null]
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

    private static mapToAdminUser(row: any): AdminUserType {
        return {
            id: row.id,
            notification_token: row.notification_token,
            role: row.role,
            name: row.name,
        }
    }
}
