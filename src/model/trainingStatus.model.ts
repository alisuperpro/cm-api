import { db } from '../db/db'

export class TrainingStatusModel {
    static tableName = 'training_status'

    static async all() {
        try {
            const result = await db.execute(`SELECT * FROM ${this.tableName}`)

            return [undefined, result.rows]
        } catch (err) {
            return [err]
        }
    }
}
