import { User } from '../../domain/entity/user.entity'
import { UserRepository } from '../../domain/repository/user.repository'
import { UserBirthDate } from '../../domain/value-objects/userBirthDate.vo'
import { UserDisability } from '../../domain/value-objects/userDisability.vo'
import { UserDocId } from '../../domain/value-objects/userDocId.vo'
import { UserEmail } from '../../domain/value-objects/userEmail.vo'
import { UserFullName } from '../../domain/value-objects/userFullName.vo'
import { UserHowFindUs } from '../../domain/value-objects/userHowFindUs.vo'
import { UserId } from '../../domain/value-objects/userId.vo'
import { UserIgUsername } from '../../domain/value-objects/userIgUsername.vo'
import { UserOccupationStatus } from '../../domain/value-objects/userOccupationStatus.vo'
import { UserPhone } from '../../domain/value-objects/userPhone.vo'
import { UserUniversity } from '../../domain/value-objects/userUniversity.vo'
import { CreateUserDTO } from '../dto/createUser.dto'

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
