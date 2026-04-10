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

export class UserCreate {
    constructor(private repository: UserRepository) {}

    async run(
        id: string,
        fullName: string,
        docId: string,
        email: string,
        phone: string,
        birthDate: string,
        occupationStatus: string,
        university: string,
        howFindUs: string,
        disability: string,
        igUsername: string
    ) {
        const user = new User(
            new UserId(id),
            new UserFullName(fullName),
            new UserDocId(docId),
            new UserEmail(email),
            new UserPhone(phone),
            new UserBirthDate(birthDate),
            new UserOccupationStatus(occupationStatus),
            new UserUniversity(university),
            new UserHowFindUs(howFindUs),
            new UserDisability(disability),
            new UserIgUsername(igUsername)
        )

        return this.repository.create(user)
    }
}
