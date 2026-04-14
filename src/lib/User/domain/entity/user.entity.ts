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

export class User {
    public readonly id: UserId
    public readonly fullName: UserFullName
    public readonly docId: UserDocId
    public readonly email: UserEmail
    public readonly phone: UserPhone
    public readonly birthDate: UserBirthDate
    public readonly occupationStatus: UserOccupationStatus
    public readonly university: UserUniversity
    public readonly howFindUs: UserHowFindUs
    public readonly disability: UserDisability
    public readonly igUsername: UserIgUsername

    constructor(
        id: UserId,
        fullName: UserFullName,
        docId: UserDocId,
        email: UserEmail,
        phone: UserPhone,
        birthDate: UserBirthDate,
        occupationStatus: UserOccupationStatus,
        university: UserUniversity,
        howFindUs: UserHowFindUs,
        disability: UserDisability,
        igUsername: UserIgUsername
    ) {
        this.id = id
        this.fullName = fullName
        this.docId = docId
        this.email = email
        this.phone = phone
        this.birthDate = birthDate
        this.occupationStatus = occupationStatus
        this.university = university
        this.howFindUs = howFindUs
        this.disability = disability
        this.igUsername = igUsername
    }
}
