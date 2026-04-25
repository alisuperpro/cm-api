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
import { UserGender } from '../value-objects/userGender.vo'
import { UserCountryOfResidence } from '../value-objects/userCountryOfResidence.vo'
import { UserTiktokUsername } from '../value-objects/userTiktokUsername.vo'

export interface IUser {
    id: UserId
    fullName: UserFullName
    docId: UserDocId
    email: UserEmail
    phone: UserPhone
    birthDate: UserBirthDate
    occupationStatus: UserOccupationStatus
    university: UserUniversity
    howFindUs: UserHowFindUs
    disability: UserDisability
    igUsername: UserIgUsername
    gender: UserGender
    countryOfResidence: UserCountryOfResidence
    tiktokUsername: UserTiktokUsername
}

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
    public readonly gender: UserGender
    public readonly countryOfResidence: UserCountryOfResidence
    public readonly tiktokUsername: UserTiktokUsername

    constructor(user: IUser) {
        this.id = user.id
        this.fullName = user.fullName
        this.docId = user.docId
        this.email = user.email
        this.phone = user.phone
        this.birthDate = user.birthDate
        this.occupationStatus = user.occupationStatus
        this.university = user.university
        this.howFindUs = user.howFindUs
        this.disability = user.disability
        this.igUsername = user.igUsername
        this.gender = user.gender
        this.countryOfResidence = user.countryOfResidence
        this.tiktokUsername = user.tiktokUsername
    }
}
