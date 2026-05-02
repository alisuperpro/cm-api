import { UserNotFoundError } from '@/lib/User/domain/errors/userNotFoundError.error'
import { UserRepository } from '@/lib/User/domain/repository/user.repository'
import { UserDocId } from '../../domain/value-objects/userDocId.vo'

export class UserFindByDocId {
    constructor(private repository: UserRepository) {}

    async run(docId: string) {
        const user = await this.repository.findByDocId(new UserDocId(docId))

        if (!user) throw new UserNotFoundError('User not found')

        return user
    }
}
