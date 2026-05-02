import { User } from '@/lib/User/domain/entity/user.entity'
import { UserId } from '@/lib/User/domain/value-objects/userId.vo'
import { UserPhone } from '../value-objects/userPhone.vo'

export interface UserRepository {
    create(user: User): Promise<void>
    getAll(): Promise<User[]>
    findById(id: UserId): Promise<User | null>
    findByPhone(phone: UserPhone): Promise<User | null>
}
