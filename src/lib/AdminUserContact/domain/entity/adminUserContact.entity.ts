import { AdminUserContactId } from '../value-objects/adminUserContactId.vo'
import { AdminUserContactName } from '../value-objects/adminUserContactName.vo'
import { AdminUserContactPhone } from '../value-objects/adminUserContactPhone.vo'
import { AdminUserContactUserId } from '../value-objects/adminUserContactUserId.vo'

export interface IAdminUserContact {
    id: AdminUserContactId
    userId: AdminUserContactUserId
    phone: AdminUserContactPhone
    name: AdminUserContactName
}

export class AdminUserContact {
    id: AdminUserContactId
    userId: AdminUserContactUserId
    phone: AdminUserContactPhone
    name: AdminUserContactName

    constructor(adminUser: IAdminUserContact) {
        this.id = adminUser.id
        this.userId = adminUser.userId
        this.phone = adminUser.phone
        this.name = adminUser.name
    }

    toPrimitives() {
        return {
            id: this.id.value,
            name: this.name.value,
            userId: this.userId.value,
            phone: this.phone.value,
        }
    }
}
