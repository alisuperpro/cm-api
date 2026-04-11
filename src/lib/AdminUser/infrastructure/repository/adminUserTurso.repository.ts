import { TursoDatabase } from '../../../shared/insfrastructure/database/turso.db'
import { AdminUser } from '../../domain/entity/adminUser.entity'
import { AdminUserRepository } from '../../domain/repository/adminUser.repository'
import { AdminUserId } from '../../domain/value-objects/adminUserId.vo'
import { AdminUserName } from '../../domain/value-objects/adminUserName.vo'
import { AdminUserNotificationToken } from '../../domain/value-objects/adminUserNotificationToken.vo'
import { AdminUserRole } from '../../domain/value-objects/adminUserRole.vo'

type AdminUserTurso = {
    id: string
    notification_token: string
    role: string
    name: string
}

export class AdminUserTursoRepository implements AdminUserRepository {
    private db = TursoDatabase.getInstance().getClient()
    private tableName = 'admin_user'

    async create(adminUser: AdminUser): Promise<void> {
        await this.db.execute({
            sql: `INSERT INTO ${this.tableName} (id, role, name) VALUES (?,?,?)`,
            args: [
                adminUser.id.value,
                adminUser.role.value,
                adminUser.name.value,
            ],
        })
    }

    async getAll(): Promise<AdminUser[]> {
        const query = {
            sql: `SELECT * FROM ${this.tableName}`,
        }

        const result = await this.db.execute(query)

        return result.rows.map((row) =>
            this.mapToDomain(row as unknown as AdminUserTurso)
        )
    }

    async findById(id: AdminUserId): Promise<AdminUser | null> {
        const query = {
            sql: `SELECT * FROM ${this.tableName} WHERE id = ?`,
            args: [id.value],
        }

        const result = await this.db.execute(query)

        return this.mapToDomain(result.rows[0] as unknown as AdminUserTurso)
    }

    async updateNotificatonToken(
        id: AdminUserId,
        token: AdminUserNotificationToken
    ): Promise<void> {
        const query = {
            sql: `UPDATE ${this.tableName} SET notification_token = ? WHERE id = ?`,
            args: [token.value, id.value],
        }
        await this.db.execute(query)
    }

    private mapToDomain(adminUser: AdminUserTurso) {
        return new AdminUser({
            id: new AdminUserId(adminUser.id),
            name: new AdminUserName(adminUser.name),
            notificationToken: new AdminUserNotificationToken(
                adminUser.notification_token
            ),
            role: new AdminUserRole(adminUser.role),
        })
    }
}
