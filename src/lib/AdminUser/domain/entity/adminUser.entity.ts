import { AdminUserId } from '@/lib/AdminUser/domain/value-objects/adminUserId.vo'
import { AdminUserName } from '@/lib/AdminUser/domain/value-objects/adminUserName.vo'
import { AdminUserNotificationToken } from '@/lib/AdminUser/domain/value-objects/adminUserNotificationToken.vo'
import { AdminUserRole } from '@/lib/AdminUser/domain/value-objects/adminUserRole.vo'
import { AdminUserPosition } from '../value-objects/adminUserPosition.vo'
import { AdminUserState } from '../value-objects/adminUserState.vo'
import { AdminUserEmail } from '../value-objects/adminUserEmail.vo'

export interface IAdminUser {
    id: AdminUserId
    notificationToken: AdminUserNotificationToken
    role: AdminUserRole
    name: AdminUserName
    position: AdminUserPosition
    state: AdminUserState
    email: AdminUserEmail
}

export class AdminUser {
    id: AdminUserId
    notificationToken: AdminUserNotificationToken
    role: AdminUserRole
    name: AdminUserName
    position: AdminUserPosition
    state: AdminUserState
    email: AdminUserEmail
    constructor(adminUser: IAdminUser) {
        this.id = adminUser.id
        this.notificationToken = adminUser.notificationToken
        this.role = adminUser.role
        this.name = adminUser.name
        this.position = adminUser.position
        this.state = adminUser.state
        this.email = adminUser.email
    }

    toPrimitives() {
        return {
            id: this.id.value,
            notificationToken: this.notificationToken.value,
            role: this.role.value,
            name: this.name.value,
            position: this.position.value,
            state: this.state.value,
            email: this.email.value,
        }
    }
}
