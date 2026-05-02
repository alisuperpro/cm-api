import { User } from '@/lib/User/domain/entity/user.entity'
import { UserId } from '@/lib/User/domain/value-objects/userId.vo'
import { UserPhone } from '../value-objects/userPhone.vo'
import { UserDocId } from '../value-objects/userDocId.vo'
import { UserEmail } from '../value-objects/userEmail.vo'
import { UserIgUsername } from '../value-objects/userIgUsername.vo'
import { UserTiktokUsername } from '../value-objects/userTiktokUsername.vo'

export interface UserRepository {
    create(user: User): Promise<void>
    getAll(): Promise<User[]>
    findById(id: UserId): Promise<User | null>
    findByPhone(phone: UserPhone): Promise<User | null>
    findByDocId(docId: UserDocId): Promise<User | null>
    findByEmail(email: UserEmail): Promise<User | null>
    findByIgUsername(igUsername: UserIgUsername): Promise<User | null>
    findByTiktokUsername(
        tiktokUsername: UserTiktokUsername
    ): Promise<User | null>
}
