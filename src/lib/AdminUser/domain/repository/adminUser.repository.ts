import { AdminUser } from '../entity/adminUser.entity'
import { AdminUserId } from '../value-objects/adminUserId.vo'
import { AdminUserNotificationToken } from '../value-objects/adminUserNotificationToken.vo'

export interface AdminUserRepository {
    create(adminUser: AdminUser): Promise<void>
    getAll(): Promise<AdminUser[]>
    findById(id: AdminUserId): Promise<AdminUser | null>
    updateNotificatonToken(
        id: AdminUserId,
        token: AdminUserNotificationToken
    ): Promise<void>
}
