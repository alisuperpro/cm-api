import { AdminUserId } from '../value-objects/adminUserId.vo'
import { AdminUserName } from '../value-objects/adminUserName.vo'
import { AdminUserNotificationToken } from '../value-objects/adminUserNotificationToken.vo'
import { AdminUserRole } from '../value-objects/adminUserRole.vo'

export interface IAdminUser {
    id: AdminUserId
    notificationToken: AdminUserNotificationToken
    role: AdminUserRole
    name: AdminUserName
}

export class AdminUser {
    id: AdminUserId
    notificationToken: AdminUserNotificationToken
    role: AdminUserRole
    name: AdminUserName

    constructor(adminUser: IAdminUser) {
        this.id = adminUser.id
        this.notificationToken = adminUser.notificationToken
        this.role = adminUser.role
        this.name = adminUser.name
    }

    toPrimitives() {
        return {
            id: this.id.value,
            notificationToken: this.notificationToken.value,
            role: this.role.value,
            name: this.name.value,
        }
    }
}
