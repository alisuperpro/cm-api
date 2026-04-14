import { AdminUserRepository } from '@/lib/AdminUser/domain/repository/adminUser.repository'

export class AdminUserGetAll {
    constructor(private repository: AdminUserRepository) {}

    async run() {
        return await this.repository.getAll()
    }
}
