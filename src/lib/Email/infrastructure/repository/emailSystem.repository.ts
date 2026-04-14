import { TursoDatabase } from '../../../shared/insfrastructure/database/turso.db'
import { EmailSystemDetailsDTO } from '../../application/dto/emailSystemDetails.dto'
import { EmailSystemQueryRepository } from '../../application/query/emailSystemQuery.repository'
import { EmailSystem } from '../../domain/entity/emailystem.entity'
import { EmailSystemRepository } from '../../domain/repository/emailSystem.repository'
import { EmailSystemActive } from '../../domain/value-objects/emailSystem/emailSystemActive.vo'
import { EmailSystemEmail } from '../../domain/value-objects/emailSystem/emailSystemEmail.vo'
import { EmailSystemHost } from '../../domain/value-objects/emailSystem/emailSystemHost.vo'
import { EmailSystemId } from '../../domain/value-objects/emailSystem/emailSystemId.vo'
import { EmailSystemName } from '../../domain/value-objects/emailSystem/emailSystemName.vo'
import { EmailSystemPassword } from '../../domain/value-objects/emailSystem/emailSystemPassword.vo'
import { EmailSystemPort } from '../../domain/value-objects/emailSystem/emailSystemPort.vo'

type EmailSystemTurso = {
    id: string
    email: string
    name: string
    password: string
    host: string
    port: number
    active: boolean
}

export class EmailSystemTursoRepository
    implements EmailSystemRepository, EmailSystemQueryRepository
{
    private db = TursoDatabase.getInstance().getClient()
    private tableName = 'email_system'

    async create(emailSystem: EmailSystem): Promise<void> {
        const query = {
            sql: `INSERT INTO ${this.tableName} (id, email, name, password, host, port, active) VALUES (?,?,?,?,?,?,?)`,
            args: [
                emailSystem.id.value,
                emailSystem.email.value,
                emailSystem.name.value,
                emailSystem.password.value,
                emailSystem.host.value,
                emailSystem.port.value,
                emailSystem.active.value,
            ],
        }

        await this.db.execute(query)
    }

    async getAll(): Promise<EmailSystemDetailsDTO[]> {
        const query = {
            sql: `SELECT * FROM ${this.tableName}`,
            args: [],
        }

        const result = await this.db.execute(query)

        return result.rows.map((row) => row as unknown as EmailSystemDetailsDTO)
    }

    async findById(id: string): Promise<EmailSystemDetailsDTO | null> {
        const query = {
            sql: `SELECT * FROM ${this.tableName} WHERE id = ?`,
            args: [id],
        }

        const result = await this.db.execute(query)

        return this.mapToDetails(result.rows[0] as unknown as EmailSystemTurso)
    }

    private mapToDetails(row: EmailSystemTurso) {
        return {
            id: row.id,
            email: row.email,
            name: row.name,
            password: row.password,
            host: row.host,
            port: row.port,
            active: row.active,
        }
    }
}
