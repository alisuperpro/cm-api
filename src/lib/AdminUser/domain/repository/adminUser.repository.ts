import { AdminUser } from '@/lib/AdminUser/domain/entity/adminUser.entity'
import { AdminUserId } from '@/lib/AdminUser/domain/value-objects/adminUserId.vo'
import { AdminUserNotificationToken } from '@/lib/AdminUser/domain/value-objects/adminUserNotificationToken.vo'

export interface AdminUserRepository {
    create(adminUser: AdminUser): Promise<void>
    getAll(): Promise<AdminUser[]>
    findById(id: AdminUserId): Promise<AdminUser | null>
    updateNotificatonToken(
        id: AdminUserId,
        token: AdminUserNotificationToken
    ): Promise<void>
}
