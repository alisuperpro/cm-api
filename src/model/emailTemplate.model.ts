import { db } from '../db/db'
import { randomUUID } from 'node:crypto'
import { QueryBuilder } from '../utils/queryBuilder'

export class EmailTemplateModel {
    static tableName = 'email_template'

    static async create({
        emailId,
        html,
        subject,
        active,
        title,
        slug,
    }: {
        emailId: string
        html: string
        subject: string
        active: boolean
        title: string
        slug: string
    }) {
        try {
            const id = randomUUID()
            await db.execute({
                sql: `INSERT INTO ${this.tableName} (id, email_id, html,subject, active, title, slug) VALUES (?,?,?,?,?,?,?)`,
                args: [id, emailId, html, subject, active, title, slug],
            })

            return [undefined, true]
        } catch (err) {
            return [err]
        }
    }

    static async all({
        active,
        id,
        slug,
    }: {
        active?: boolean
        id?: string
        slug?: string
    }) {
        try {
            const builder = new QueryBuilder(`${this.tableName}`)
            builder
                .select([
                    'email_system.email',
                    'email_system.name',
                    'html',
                    'subject',
                    'title',
                    'slug',
                    'host',
                    'port',
                ])
                .join(
                    'email_system',
                    `${this.tableName}.email_id = email_system.id`
                )

            if (active) {
                builder.where('active', active)
            }

            if (id) {
                builder.where('id', id)
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
}
