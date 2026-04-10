import { UserBirthDate } from '../value-objects/userBirthDate.vo'
import { UserDisability } from '../value-objects/userDisability.vo'
import { UserDocId } from '../value-objects/userDocId.vo'
import { UserEmail } from '../value-objects/userEmail.vo'
import { UserFullName } from '../value-objects/userFullName.vo'
import { UserHowFindUs } from '../value-objects/userHowFindUs.vo'
import { UserId } from '../value-objects/userId.vo'
import { UserIgUsername } from '../value-objects/userIgUsername.vo'
import { UserOccupationStatus } from '../value-objects/userOccupationStatus.vo'
import { UserPhone } from '../value-objects/userPhone.vo'
import { UserUniversity } from '../value-objects/userUniversity.vo'

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
