import { AdminUserNotFoundError } from '../../domain/errors/adminUserNotFoundError.error'
import { AdminUserRepository } from '../../domain/repository/adminUser.repository'
import { AdminUserId } from '../../domain/value-objects/adminUserId.vo'

export class AdminUserFindById {
    constructor(private repository: AdminUserRepository) {}

    async run(id: string) {
        const adminUser = await this.repository.findById(new AdminUserId(id))

        if (!adminUser) throw new AdminUserNotFoundError('Admin user not found')

        return adminUser
    }
}
