import { db } from '../db/db'
import { randomUUID } from 'node:crypto'
import { QueryBuilder } from '../utils/queryBuilder'

export class TrainingUserModel {
    static tableName = 'training_user'
    static async create({
        trainingId,
        userId,
        howFind,
        experience,
        additionalInfo,
        payRef,
        payImg,
        isArrived,
    }: {
        trainingId: string
        userId: string
        howFind: string
        experience: string
        additionalInfo: string
        payRef: string
        payImg: string
        isArrived: boolean
    }) {
        try {
            const id = randomUUID()
            await db.execute({
                sql: `INSERT INTO ${this.tableName} (id, training_id, user_id, how_find, experience, additional_info, pay_ref, pay_img, is_arrived)
                VALUES (?,?,?,?,?,?,?,?,?)`,
                args: [
                    id,
                    trainingId,
                    userId,
                    howFind,
                    experience,
                    additionalInfo,
                    payRef,
                    payImg,
                    isArrived,
                ],
            })

            return [undefined, true]
        } catch (err) {
            return [err]
        }
    }

    static async all({ name, slug }: { name?: string; slug?: string }) {
        try {
            const builder = new QueryBuilder(`${this.tableName} tu`)
            builder
                .select([
                    'u.full_name',
                    'u.email',
                    'u.doc_id',
                    'u.ig_username',
                    'u.phone',
                    'u.disability',
                    '*',

                    'tu.how_find',
                    'tu.experience',
                    'tu.pay_ref',
                    'tu.pay_img',
                    'tu.is_arrived',
                ])
                .join('user u', 'tu.user_id = u.id')
                .join('training t', 'tu.training_id = t.id')

            if (name) {
                builder.where('name', `%${name}%`, 'LIKE')
            }

            if (slug) {
                builder.where('slug', slug)
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

    static async byTrainingId({ trainingId }: { trainingId: string }) {
        try {
            const result = await db.execute({
                sql: `SELECT * FROM ${this.tableName} WHERE training_id = ?`,
                args: [trainingId],
            })

            return [undefined, result.rows[0]]
        } catch (err) {
            return [err]
        }
    }

    static async byTrainingIdAndUserId({
        userId,
        trainingId,
    }: {
        userId: string
        trainingId: string
    }) {
        try {
            const result = await db.execute({
                sql: `SELECT * FROM ${this.tableName} WHERE user_id = ? AND training_id = ?`,
                args: [userId, trainingId],
            })

            return [undefined, result.rows[0]]
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

    static async updateIsArrived({
        id,
        isArrived,
    }: {
        id: string
        isArrived: boolean
    }) {
        try {
            const result = await db.execute({
                sql: `UPDATE ${this.tableName} SET is_arrived = ? WHERE id = ?`,
                args: [isArrived, id],
            })

            return [undefined, result.rows]
        } catch (err) {
            return [err]
        }
    }
}
