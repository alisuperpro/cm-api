import { UserNotFoundError } from '@/lib/User/domain/errors/userNotFoundError.error'
import { UserRepository } from '@/lib/User/domain/repository/user.repository'
import { UserPhone } from '@/lib/User/domain/value-objects/userPhone.vo'

export class UserFindByPhone {
    constructor(private repository: UserRepository) {}

    async run(phone: string) {
        const user = await this.repository.findByPhone(new UserPhone(phone))

        if (!user) throw new UserNotFoundError('User not found')

        return user
    }
}
