import { User } from '@/lib/User/domain/entity/user.entity'
import { UserRepository } from '@/lib/User/domain/repository/user.repository'
import { UserBirthDate } from '@/lib/User/domain/value-objects/userBirthDate.vo'
import { UserDisability } from '@/lib/User/domain/value-objects/userDisability.vo'
import { UserDocId } from '@/lib/User/domain/value-objects/userDocId.vo'
import { UserEmail } from '@/lib/User/domain/value-objects/userEmail.vo'
import { UserFullName } from '@/lib/User/domain/value-objects/userFullName.vo'
import { UserHowFindUs } from '@/lib/User/domain/value-objects/userHowFindUs.vo'
import { UserId } from '@/lib/User/domain/value-objects/userId.vo'
import { UserIgUsername } from '@/lib/User/domain/value-objects/userIgUsername.vo'
import { UserOccupationStatus } from '@/lib/User/domain/value-objects/userOccupationStatus.vo'
import { UserPhone } from '@/lib/User/domain/value-objects/userPhone.vo'
import { UserUniversity } from '@/lib/User/domain/value-objects/userUniversity.vo'
import { CreateUserDTO } from '@/lib/User/application/dto/createUser.dto'
import { UserGender } from '@/lib/User/domain/value-objects/userGender.vo'
import { UserCountryOfResidence } from '../../domain/value-objects/userCountryOfResidence.vo'
import { UserTiktokUsername } from '../../domain/value-objects/userTiktokUsername.vo'
import { UserFirstName } from '../../domain/value-objects/userFirstName.vo'
import { UserSecondName } from '../../domain/value-objects/userSecondName.vo'
import { UserThirdName } from '../../domain/value-objects/userThirdName.vo'
import { UserLastName } from '../../domain/value-objects/userLastName.vo'
import { UserSecondLastName } from '../../domain/value-objects/userSecondLastName.vo'
import { UserPhoneExistsError } from '../../domain/errors/userPhoneExistsError.error'
import { UserDocIdExistsError } from '../../domain/errors/userDocIdExistsError.error'
import { UserEmailExistsError } from '../../domain/errors/userEmailExistsError.error'
import { UserIgUsernameExistsError } from '../../domain/errors/userIgUsernameExistsError.error'
import { UserTiktokUsernameExistsError } from '../../domain/errors/userTiktokUsernameError.error'

export class UserCreate {
    constructor(private repository: UserRepository) {}

    async run(dto: CreateUserDTO) {
        const isPhoneExists = await this.repository.findByPhone(
            new UserPhone(dto.phone)
        )

        if (isPhoneExists) {
            throw new UserPhoneExistsError('User phone already use')
        }

        const isDocIdExists = await this.repository.findByDocId(
            new UserDocId(dto.docId)
        )

        if (isDocIdExists) {
            throw new UserDocIdExistsError('User docId already use')
        }

        const isEmailExists = await this.repository.findByEmail(
            new UserEmail(dto.email)
        )

        if (isEmailExists) {
            throw new UserEmailExistsError('User email already use')
        }

        const isIgUsernameExists = await this.repository.findByIgUsername(
            new UserIgUsername(dto.igUsername)
        )

        if (isIgUsernameExists) {
            throw new UserIgUsernameExistsError('User ig username already use')
        }

        const isTiktokUsernameExists =
            await this.repository.findByTiktokUsername(
                new UserTiktokUsername(dto.tiktokUsername)
            )

        if (isTiktokUsernameExists) {
            throw new UserTiktokUsernameExistsError(
                'User tiktok username already use'
            )
        }

        const user = new User({
            id: new UserId(dto.id),
            fullName: new UserFullName(dto.fullName),
            docId: new UserDocId(dto.docId),
            email: new UserEmail(dto.email),
            phone: new UserPhone(dto.phone),
            birthDate: new UserBirthDate(dto.birthDate),
            occupationStatus: new UserOccupationStatus(dto.occupationStatus),
            university: new UserUniversity(dto.university),
            howFindUs: new UserHowFindUs(dto.howFindUs),
            disability: new UserDisability(dto.disability),
            igUsername: new UserIgUsername(dto.igUsername),
            gender: new UserGender(dto.gender),
            countryOfResidence: new UserCountryOfResidence(
                dto.countryOfResidence
            ),
            tiktokUsername: new UserTiktokUsername(dto.tiktokUsername),
            firstName: new UserFirstName(dto.firstName),
            secondName: new UserSecondName(dto.secondName),
            thirdName: new UserThirdName(dto.thirdName),
            lastName: new UserLastName(dto.lastName),
            secondLastName: new UserSecondLastName(dto.secondLastName),
        })

        return await this.repository.create(user)
    }
}
