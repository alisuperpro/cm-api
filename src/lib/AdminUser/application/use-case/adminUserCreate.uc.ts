import { AdminUser } from '@/lib/AdminUser/domain/entity/adminUser.entity'
import { AdminUserRepository } from '@/lib/AdminUser/domain/repository/adminUser.repository'
import { AdminUserId } from '@/lib/AdminUser/domain/value-objects/adminUserId.vo'
import { AdminUserName } from '@/lib/AdminUser/domain/value-objects/adminUserName.vo'
import { AdminUserNotificationToken } from '@/lib/AdminUser/domain/value-objects/adminUserNotificationToken.vo'
import { AdminUserRole } from '@/lib/AdminUser/domain/value-objects/adminUserRole.vo'
import { AdminUserDTO } from '@/lib/AdminUser/application/dto/adminUserCreate.dto'
import { AdminUserPosition } from '../../domain/value-objects/adminUserPosition.vo'

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
            position: new AdminUserPosition(adminUser.position),
            state: new AdminUserPosition(adminUser.state),
            email: new AdminUserPosition(adminUser.email),
        })

        return await this.repository.create(adminUserObject)
    }
}
