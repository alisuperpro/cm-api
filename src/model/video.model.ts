import { db } from '../db/db'
import { randomUUID } from 'node:crypto'
import { QueryBuilder } from '../utils/queryBuilder'

interface VideoType {
    title: string
    description?: string
    url: string
    thumbnailUrl?: string
    duration?: string
    categoryId: string
    visibilityId: string
    featured: string
    views: string
    slug: string
    createdAt: number
    updatedAt: number
}

export class VideoModel {
    static tableName = 'video'

    static async create({
        title,
        description,
        url,
        thumbnailUrl,
        duration,
        categoryId,
        visibilityId,
        featured,
        views,
        slug,
        createdAt,
        updatedAt,
    }: VideoType) {
        try {
            const id = randomUUID()

            await db.execute({
                sql: `INSERT INTO ${this.tableName} (id, title, description, url, thumbnail_url, duration, category_id, visibility_id, featured, views, slug, created_at, updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`,
                args: [
                    id,
                    title,
                    description ? description : null,
                    url,
                    thumbnailUrl ? thumbnailUrl : null,
                    duration ? duration : null,
                    categoryId,
                    visibilityId,
                    featured,
                    views,
                    slug,
                    createdAt,
                    updatedAt,
                ],
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

    static async updateTitle({ id, title }: { id: string; title: string }) {
        try {
            await db.execute({
                sql: `UPDATE ${this.tableName} SET title = ? WHERE id = ?`,
                args: [title, id],
            })

            return [undefined, true]
        } catch (err) {
            return [err]
        }
    }

    static async bySlug({ slug }: { slug: string }) {
        try {
            const result = await db.execute({
                sql: `SELECT * FROM ${this.tableName} WHERE slug = ?`,
                args: [slug],
            })

            return [undefined, result.rows[0]]
        } catch (err) {
            return [err]
        }
    }
}
