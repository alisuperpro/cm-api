import { db } from '../db/db'

export class UserModel {
    static tableName = 'user'
    static async create({
        id,
        fullName,
        docId,
        email,
        phone,
        birthday,
        occupationStatus,
        university,
        howFindUs,
        disability,
        igUsername,
    }: {
        id: string
        fullName: string
        docId: string
        email: string
        phone: string
        birthday: string
        occupationStatus: string
        university: string
        howFindUs: string
        disability: string
        igUsername: string
    }) {
        try {
            await db.execute({
                sql: `INSERT INTO ${this.tableName}
                (id, full_name, doc_id, email, phone, birthday, occupation_status, university, how_find_us, disability, ig_username)
                VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
                args: [
                    id,
                    fullName,
                    docId,
                    email,
                    phone,
                    birthday,
                    occupationStatus,
                    university,
                    howFindUs,
                    disability,
                    igUsername,
                ],
            })

            const result = await db.execute({
                sql: `SELECT * FROM ${this.tableName} WHERE id = ?`,
                args: [id],
            })

            return [undefined, result.rows]
        } catch (err) {
            return [err]
        }
    }

    static async updateInfo({
        id,
        fullName,
        docId,
        email,
        phone,
        birthday,
        occupationStatus,
        university,
        howFindUs,
        disability,
    }: {
        id: string
        fullName: string
        docId: string
        email: string
        phone: string
        birthday: string
        occupationStatus: string
        university: string
        howFindUs: string
        disability: string
    }) {
        try {
            await db.execute({
                sql: `UPDATE ${this.tableName}
                SET
                full_name = ?,
                doc_id = ?,
                email = ?,
                phone = ?,
                birthday = ?,
                occupation_status = ?,
                university = ?,
                how_find_us = ?,
                disability = ?
                WHERE id = ?`,
                args: [
                    fullName,
                    docId,
                    email,
                    phone,
                    birthday,
                    occupationStatus,
                    university,
                    howFindUs,
                    disability,
                    id,
                ],
            })

            const result = await db.execute({
                sql: `SELECT * FROM ${this.tableName} WHERE id = ?`,
                args: [id],
            })

            return [undefined, result.rows]
        } catch (err) {
            return [err]
        }
    }
}
