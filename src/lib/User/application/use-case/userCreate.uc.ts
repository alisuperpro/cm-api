import { User } from '@/User/domain/entity/user.entity'
import { UserRepository } from '@/User/domain/repository/user.repository'
import { UserBirthDate } from '@/User/domain/value-objects/userBirthDate.vo'
import { UserDisability } from '@/User/domain/value-objects/userDisability.vo'
import { UserDocId } from '@/User/domain/value-objects/userDocId.vo'
import { UserEmail } from '@/User/domain/value-objects/userEmail.vo'
import { UserFullName } from '@/User/domain/value-objects/userFullName.vo'
import { UserHowFindUs } from '@/User/domain/value-objects/userHowFindUs.vo'
import { UserId } from '@/User/domain/value-objects/userId.vo'
import { UserIgUsername } from '@/User/domain/value-objects/userIgUsername.vo'
import { UserOccupationStatus } from '@/User/domain/value-objects/userOccupationStatus.vo'
import { UserPhone } from '@/User/domain/value-objects/userPhone.vo'
import { UserUniversity } from '@/User/domain/value-objects/userUniversity.vo'
import { CreateUserDTO } from '@/User/application/dto/createUser.dto'

export class UserCreate {
    constructor(private repository: UserRepository) {}

    async run(dto: CreateUserDTO) {
        const user = new User(
            new UserId(dto.id),
            new UserFullName(dto.fullName),
            new UserDocId(dto.docId),
            new UserEmail(dto.email),
            new UserPhone(dto.phone),
            new UserBirthDate(dto.birthDate),
            new UserOccupationStatus(dto.occupationStatus),
            new UserUniversity(dto.university),
            new UserHowFindUs(dto.howFindUs),
            new UserDisability(dto.disability),
            new UserIgUsername(dto.igUsername)
        )

        return await this.repository.create(user)
    }
}
