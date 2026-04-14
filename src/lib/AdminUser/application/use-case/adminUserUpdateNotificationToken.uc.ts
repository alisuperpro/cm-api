import { AdminUserRepository } from '@/lib/AdminUser/domain/repository/adminUser.repository'
import { AdminUserId } from '@/lib/AdminUser/domain/value-objects/adminUserId.vo'
import { AdminUserNotificationToken } from '@/lib/AdminUser/domain/value-objects/adminUserNotificationToken.vo'
import { AdminUserUpdateNotoficationTokenDTO } from '@/lib/AdminUser/application/dto/adminUserUpdateNotificationToken.dto'

export class AdminUserUpdateNotoficationToken {
    constructor(private repository: AdminUserRepository) {}

    async run(data: AdminUserUpdateNotoficationTokenDTO) {
        return await this.repository.updateNotificatonToken(
            new AdminUserId(data.id),
            new AdminUserNotificationToken(data.token)
        )
    }
}
