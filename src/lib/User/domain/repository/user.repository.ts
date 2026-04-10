import { User } from '../entity/user.entity'
import { UserId } from '../value-objects/userId.vo'

export interface UserRepository {
    create(user: User): Promise<void>
    all(): Promise<User[]>
    findById(id: UserId): Promise<User | null>
}
