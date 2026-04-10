import { UserNotFoundError } from '../../domain/errors/userNotFoundError.error'
import { UserRepository } from '../../domain/repository/user.repository'
import { UserId } from '../../domain/value-objects/userId.vo'

export class UserFindById {
    constructor(private repository: UserRepository) {}

    async run(id: string) {
        const user = await this.repository.findById(new UserId(id))

        if (!user) throw new UserNotFoundError('User not found')

        return user
    }
}
