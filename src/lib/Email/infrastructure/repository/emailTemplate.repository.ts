import { TursoDatabase } from '../../../shared/insfrastructure/database/turso.db'
import { QueryBuilder } from '../../../shared/insfrastructure/utils/queryBuilder'
import { EmailTemplateDetailsDTO } from '../../application/dto/emailTemplateDetails.dto'
import {
    EmailTemplateParams,
    EmailTemplateQueryRepository,
} from '../../application/query/emailTemplateQuery.repository'
import { EmailTemplate } from '../../domain/entity/emailTemplate.entity'
import { EmailTemplateRepository } from '../../domain/repository/emailTemplate.repository'

type EmailTemplateTurso = {
    template_id: string
    title: string
    email_id: string
    html: string
    subject: string
    active: boolean
    slug: string
    email: string
    name: string
    template_active: boolean
    host: string
    port: number
    email_active: boolean
}
export class EmailTemplateTursoRepository
    implements EmailTemplateRepository, EmailTemplateQueryRepository
{
    private db = TursoDatabase.getInstance().getClient()
    private tableName = 'email_template'

    async create(emailTemplate: EmailTemplate): Promise<void> {
        const query = {
            sql: `INSERT INTO ${this.tableName} (id, email_id, html,subject, active, title, slug) VALUES (?,?,?,?,?,?,?)`,
            args: [
                emailTemplate.id.value,
                emailTemplate.emailId.value,
                emailTemplate.html.value,
                emailTemplate.subject.value,
                emailTemplate.active.value,
                emailTemplate.title.value,
                emailTemplate.slug.value,
            ],
        }

        await this.db.execute(query)
    }

    async getAll(
        params: EmailTemplateParams
    ): Promise<EmailTemplateDetailsDTO[]> {
        const builder = new QueryBuilder(`${this.tableName}`)
        builder
            .select([
                'email_system.email',
                'email_system.name',
                'email_system.active as email_active',
                'email_id',
                'html',
                'subject',
                'title',
                'slug',
                'host',
                'port',
                'email_template.active as template_active',
                'email_template.id as template_id',
            ])
            .join(
                'email_system',
                `${this.tableName}.email_id = email_system.id`
            )

        if (params.filters.active) {
            builder.where('active', params.filters.active)
        }

        if (params.filters.slug) {
            builder.where('slug', params.filters.slug)
        }

        const query = {
            sql: builder.build().sql,
            args: builder.build().args,
        }

        const result = await this.db.execute(query)

        return result.rows.map((row) =>
            this.mapToDetails(row as unknown as EmailTemplateTurso)
        )
    }

    private mapToDetails(row: EmailTemplateTurso): EmailTemplateDetailsDTO {
        return {
            id: row.template_id,
            title: row.title,
            emailId: row.email_id,
            html: row.html,
            subject: row.subject,
            active: row.template_active,
            slug: row.slug,
            email: {
                id: row.email_id,
                email: row.email,
                name: row.name,
                host: row.host,
                port: row.port,
                active: row.email_active,
            },
        }
    }
}
