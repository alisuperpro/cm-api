import { UserRepository } from '../../domain/repository/user.repository'

export class UserGetAll {
    constructor(private repository: UserRepository) {}

    async run() {
        return await this.repository.getAll()
    }
}
