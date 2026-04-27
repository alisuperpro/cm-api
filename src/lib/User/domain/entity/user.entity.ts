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
import { UserFirstName } from '../value-objects/userFirstName.vo'
import { UserSecondName } from '../value-objects/userSecondName.vo'
import { UserThirdName } from '../value-objects/userThirdName.vo'
import { UserLastName } from '../value-objects/userLastName.vo'
import { UserSecondLastName } from '../value-objects/userSecondLastName.vo'

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
    firstName: UserFirstName
    secondName: UserSecondName
    thirdName: UserThirdName
    lastName: UserLastName
    secondLastName: UserSecondLastName
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
    public readonly firstName: UserFirstName
    public readonly secondName: UserSecondName
    public readonly thirdName: UserThirdName
    public readonly lastName: UserLastName
    public readonly secondLastName: UserSecondLastName

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
        this.firstName = user.firstName
        this.secondName = user.secondName
        this.thirdName = user.thirdName
        this.lastName = user.lastName
        this.secondLastName = user.secondLastName
    }

    toPrimitives() {
        return {
            id: this.id.value,
            fullName: this.fullName.value,
            docId: this.docId.value,
            email: this.email.value,
            phone: this.phone.value,
            birthDate: this.birthDate.value,
            occupationStatus: this.occupationStatus.value,
            university: this.university.value,
            howFindUs: this.howFindUs.value,
            disability: this.disability.value,
            igUsername: this.igUsername.value,
            gender: this.gender.value,
            countryOfResidence: this.countryOfResidence.value,
            tiktokUsername: this.tiktokUsername.value,
            firstName: this.firstName.value,
            secondName: this.secondName.value,
            thirdName: this.thirdName.value,
            lastName: this.lastName.value,
            secondLastName: this.secondLastName.value,
        }
    }
}
