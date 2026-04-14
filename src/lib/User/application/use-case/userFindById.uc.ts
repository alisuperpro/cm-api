import { UserNotFoundError } from '@/lib/User/domain/errors/userNotFoundError.error'
import { UserRepository } from '@/lib/User/domain/repository/user.repository'
import { UserId } from '@/lib/User/domain/value-objects/userId.vo'
import { UserFindByIdDTO } from '@/lib/User/application/dto/userFindById.dto'

export class UserFindById {
    constructor(private repository: UserRepository) {}

    async run(dto: UserFindByIdDTO) {
        const user = await this.repository.findById(new UserId(dto.id))

        if (!user) throw new UserNotFoundError('User not found')

        return user
    }
}
