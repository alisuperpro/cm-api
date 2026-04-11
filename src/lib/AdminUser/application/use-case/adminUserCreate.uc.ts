import { AdminUser } from '../../domain/entity/adminUser.entity'
import { AdminUserRepository } from '../../domain/repository/adminUser.repository'
import { AdminUserId } from '../../domain/value-objects/adminUserId.vo'
import { AdminUserName } from '../../domain/value-objects/adminUserName.vo'
import { AdminUserNotificationToken } from '../../domain/value-objects/adminUserNotificationToken.vo'
import { AdminUserRole } from '../../domain/value-objects/adminUserRole.vo'
import { AdminUserDTO } from '../dto/adminUserCreate.dto'

export class AdminUserCreate {
    constructor(private repository: AdminUserRepository) {}

    async run(adminUser: AdminUserDTO) {
        const adminUserObject = new AdminUser({
            id: new AdminUserId(adminUser.id),
            name: new AdminUserName(adminUser.name),
            notificationToken: new AdminUserNotificationToken(
                adminUser.notificationToken
            ),
            role: new AdminUserRole(adminUser.role),
        })

        return await this.repository.create(adminUserObject)
    }
}
