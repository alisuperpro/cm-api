import { User } from '@/User/domain/entity/user.entity'
import { UserId } from '@/User/domain/value-objects/userId.vo'

export interface UserRepository {
    create(user: User): Promise<void>
    getAll(): Promise<User[]>
    findById(id: UserId): Promise<User | null>
}
