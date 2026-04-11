import { AdminUserRepository } from '../../domain/repository/adminUser.repository'
import { AdminUserId } from '../../domain/value-objects/adminUserId.vo'
import { AdminUserNotificationToken } from '../../domain/value-objects/adminUserNotificationToken.vo'
import { AdminUserUpdateNotoficationTokenDTO } from '../dto/adminUserUpdateNotificationToken.dto'

export class AdminUserUpdateNotoficationToken {
    constructor(private repository: AdminUserRepository) {}

    async run(data: AdminUserUpdateNotoficationTokenDTO) {
        return await this.repository.updateNotificatonToken(
            new AdminUserId(data.id),
            new AdminUserNotificationToken(data.token)
        )
    }
}
