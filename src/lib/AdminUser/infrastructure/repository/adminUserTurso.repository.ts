import { TursoDatabase } from '@/lib/shared/insfrastructure/database/turso.db'
import { AdminUser } from '@/lib/AdminUser/domain/entity/adminUser.entity'
import { AdminUserRepository } from '@/lib/AdminUser/domain/repository/adminUser.repository'
import { AdminUserId } from '@/lib/AdminUser/domain/value-objects/adminUserId.vo'
import { AdminUserName } from '@/lib/AdminUser/domain/value-objects/adminUserName.vo'
import { AdminUserNotificationToken } from '@/lib/AdminUser/domain/value-objects/adminUserNotificationToken.vo'
import { AdminUserRole } from '@/lib/AdminUser/domain/value-objects/adminUserRole.vo'
import { AdminUserPosition } from '../../domain/value-objects/adminUserPosition.vo'
import { AdminUserState } from '../../domain/value-objects/adminUserState.vo'
import { AdminUserEmail } from '../../domain/value-objects/adminUserEmail.vo'
import { AdminUserDocId } from '../../domain/value-objects/adminUserDocId.vo'

type AdminUserTurso = {
    id: string
    notification_token: string
    role: string
    name: string
    position: string
    state: string
    email: string
    doc_id: string
}

export class AdminUserTursoRepository implements AdminUserRepository {
    private db = TursoDatabase.getInstance().getClient()
    private tableName = 'admin_user'

    async create(adminUser: AdminUser): Promise<void> {
        await this.db.execute({
            sql: `INSERT INTO ${this.tableName} (id, role, name, position, state, email) VALUES (?,?,?,?,?,?)`,
            args: [
                adminUser.id.value,
                adminUser.role.value,
                adminUser.name.value,
                adminUser.position.value,
                adminUser.state.value,
                adminUser.email.value,
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
            position: new AdminUserPosition(adminUser.position),
            state: new AdminUserState(adminUser.state),
            email: new AdminUserEmail(adminUser.email),
            docId: new AdminUserDocId(adminUser.doc_id),
        })
    }
}
