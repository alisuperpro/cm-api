import { User } from '@/lib/User/domain/entity/user.entity'
import { UserId } from '@/lib/User/domain/value-objects/userId.vo'
import { UserFullName } from '@/lib/User/domain/value-objects/userFullName.vo'
import { UserDocId } from '@/lib/User/domain/value-objects/userDocId.vo'
import { UserEmail } from '@/lib/User/domain/value-objects/userEmail.vo'
import { UserPhone } from '@/lib/User/domain/value-objects/userPhone.vo'
import { UserBirthDate } from '@/lib/User/domain/value-objects/userBirthDate.vo'
import { UserOccupationStatus } from '@/lib/User/domain/value-objects/userOccupationStatus.vo'
import { UserUniversity } from '@/lib/User/domain/value-objects/userUniversity.vo'
import { UserHowFindUs } from '@/lib/User/domain/value-objects/userHowFindUs.vo'
import { UserDisability } from '@/lib/User/domain/value-objects/userDisability.vo'
import { UserIgUsername } from '@/lib/User/domain/value-objects/userIgUsername.vo'
import { UserGender } from '@/lib/User/domain/value-objects/userGender.vo'
import { UserCountryOfResidence } from '@/lib/User/domain/value-objects/userCountryOfResidence.vo'
import { UserTiktokUsername } from '@/lib/User/domain/value-objects/userTiktokUsername.vo'
import { UserFirstName } from '@/lib/User/domain/value-objects/userFirstName.vo'
import { UserSecondName } from '@/lib/User/domain/value-objects/userSecondName.vo'
import { UserThirdName } from '@/lib/User/domain/value-objects/userThirdName.vo'
import { UserLastName } from '@/lib/User/domain/value-objects/userLastName.vo'
import { UserSecondLastName } from '@/lib/User/domain/value-objects/userSecondLastName.vo'

// ─── Fixtures ────────────────────────────────────────────────────────────────

const FIXTURES = {
    id: '123e4567-e89b-12d3-a456-426614174000',
    fullName: 'John Doe',
    docId: '123456789',
    email: 'john.doe@example.com',
    phone: '+573001234567',
    birthDate: '1990-06-15',
    occupationStatus: 'student',
    university: 'Universidad Nacional',
    howFindUs: 'Instagram',
    disability: 'none',
    igUsername: '@johndoe',
    gender: 'male',
    countryOfResidence: 'Colombia',
    tiktokUsername: '@johndoe',
    firstName: 'John',
    secondName: 'William',
    thirdName: 'Andrew',
    lastName: 'Doe',
    secondLastName: 'Smith',
} as const

// ─── Helpers ─────────────────────────────────────────────────────────────────

type UserOverrides = Partial<{
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
}>

const makeUser = (overrides: UserOverrides = {}) =>
    new User({
        id: overrides.id ?? new UserId(FIXTURES.id),
        fullName: overrides.fullName ?? new UserFullName(FIXTURES.fullName),
        docId: overrides.docId ?? new UserDocId(FIXTURES.docId),
        email: overrides.email ?? new UserEmail(FIXTURES.email),
        phone: overrides.phone ?? new UserPhone(FIXTURES.phone),
        birthDate: overrides.birthDate ?? new UserBirthDate(FIXTURES.birthDate),
        occupationStatus:
            overrides.occupationStatus ??
            new UserOccupationStatus(FIXTURES.occupationStatus),
        university:
            overrides.university ?? new UserUniversity(FIXTURES.university),
        howFindUs: overrides.howFindUs ?? new UserHowFindUs(FIXTURES.howFindUs),
        disability:
            overrides.disability ?? new UserDisability(FIXTURES.disability),
        igUsername:
            overrides.igUsername ?? new UserIgUsername(FIXTURES.igUsername),
        gender: overrides.gender ?? new UserGender(FIXTURES.gender),
        countryOfResidence:
            overrides.countryOfResidence ??
            new UserCountryOfResidence(FIXTURES.countryOfResidence),
        tiktokUsername:
            overrides.tiktokUsername ??
            new UserTiktokUsername(FIXTURES.tiktokUsername),
        firstName: overrides.firstName ?? new UserFirstName(FIXTURES.firstName),
        secondName:
            overrides.secondName ?? new UserSecondName(FIXTURES.secondName),
        thirdName: overrides.thirdName ?? new UserThirdName(FIXTURES.thirdName),
        lastName: overrides.lastName ?? new UserLastName(FIXTURES.lastName),
        secondLastName:
            overrides.secondLastName ??
            new UserSecondLastName(FIXTURES.secondLastName),
    })

// ─── Tests ───────────────────────────────────────────────────────────────────

describe('User Entity', () => {
    // ── Construction ──────────────────────────────────────────────────────────

    describe('construction', () => {
        it('should create a User with all properties', () => {
            const user = makeUser()

            expect(user.id.value).toBe(FIXTURES.id)
            expect(user.fullName.value).toBe(FIXTURES.fullName)
            expect(user.docId.value).toBe(FIXTURES.docId)
            expect(user.email.value).toBe(FIXTURES.email)
            expect(user.phone.value).toBe(FIXTURES.phone)
            expect(user.birthDate.value).toBe(FIXTURES.birthDate)
            expect(user.occupationStatus.value).toBe(FIXTURES.occupationStatus)
            expect(user.university.value).toBe(FIXTURES.university)
            expect(user.howFindUs.value).toBe(FIXTURES.howFindUs)
            expect(user.disability.value).toBe(FIXTURES.disability)
            expect(user.igUsername.value).toBe(FIXTURES.igUsername)
            expect(user.gender.value).toBe(FIXTURES.gender)
            expect(user.countryOfResidence.value).toBe(
                FIXTURES.countryOfResidence
            )
            expect(user.tiktokUsername.value).toBe(FIXTURES.tiktokUsername)
            expect(user.firstName.value).toBe(FIXTURES.firstName)
            expect(user.secondName.value).toBe(FIXTURES.secondName)
            expect(user.thirdName.value).toBe(FIXTURES.thirdName)
            expect(user.lastName.value).toBe(FIXTURES.lastName)
            expect(user.secondLastName.value).toBe(FIXTURES.secondLastName)
        })
    })

    // ── toPrimitives ──────────────────────────────────────────────────────────

    describe('toPrimitives', () => {
        it('should return a plain object with all primitive values', () => {
            const primitives = makeUser().toPrimitives()

            expect(primitives).toEqual({
                id: FIXTURES.id,
                fullName: FIXTURES.fullName,
                docId: FIXTURES.docId,
                email: FIXTURES.email,
                phone: FIXTURES.phone,
                birthDate: FIXTURES.birthDate,
                occupationStatus: FIXTURES.occupationStatus,
                university: FIXTURES.university,
                howFindUs: FIXTURES.howFindUs,
                disability: FIXTURES.disability,
                igUsername: FIXTURES.igUsername,
                gender: FIXTURES.gender,
                countryOfResidence: FIXTURES.countryOfResidence,
                tiktokUsername: FIXTURES.tiktokUsername,
                firstName: FIXTURES.firstName,
                secondName: FIXTURES.secondName,
                thirdName: FIXTURES.thirdName,
                lastName: FIXTURES.lastName,
                secondLastName: FIXTURES.secondLastName,
            })
        })

        it('should return plain strings, not VO instances', () => {
            const primitives = makeUser().toPrimitives()

            Object.values(primitives).forEach((value) => {
                expect(typeof value).toBe('string')
            })
        })
    })

    // ── Value Objects ─────────────────────────────────────────────────────────

    describe('UserId', () => {
        it('accepts a valid UUID', () => {
            expect(new UserId(FIXTURES.id).value).toBe(FIXTURES.id)
        })

        it('throws when value is empty', () => {
            expect(() => new UserId('')).toThrow('User Id is required')
        })
    })

    describe('UserFullName', () => {
        it('accepts a valid full name', () => {
            expect(new UserFullName('Ana García').value).toBe('Ana García')
        })

        it('accepts a name with exactly 3 characters', () => {
            expect(new UserFullName('Ana').value).toBe('Ana')
        })

        it('throws when name is shorter than 3 characters', () => {
            expect(() => new UserFullName('Jo')).toThrow(
                'User full name must be at least 3 characters long'
            )
        })

        it('throws when name is empty', () => {
            expect(() => new UserFullName('')).toThrow(
                'User full name must be at least 3 characters long'
            )
        })
    })

    describe('UserDocId', () => {
        it('accepts a valid document id', () => {
            expect(new UserDocId('123456789').value).toBe('123456789')
        })

        it('accepts the minimum valid value (100000)', () => {
            expect(new UserDocId('100000').value).toBe('100000')
        })

        it('throws when shorter than 6 characters', () => {
            expect(() => new UserDocId('12345')).toThrow(
                'User document id must be at least 6 characters long'
            )
        })

        it('throws when numeric value is less than 10000', () => {
            expect(() => new UserDocId('009999')).toThrow(
                'User document id must be greather than 10000'
            )
        })
    })

    describe('UserEmail', () => {
        it('accepts a valid email', () => {
            expect(new UserEmail('user@example.com').value).toBe(
                'user@example.com'
            )
        })

        it('throws for an email without @', () => {
            expect(() => new UserEmail('userexample.com')).toThrow()
        })

        it('throws when empty', () => {
            expect(() => new UserEmail('')).toThrow()
        })
    })

    describe('UserPhone', () => {
        it('accepts international format with country code', () => {
            expect(new UserPhone('+573001234567').value).toBe('+573001234567')
        })

        it('accepts national format (10 digits)', () => {
            expect(new UserPhone('3001234567').value).toBe('3001234567')
        })

        it('accepts a phone with spaces and dashes', () => {
            expect(new UserPhone('+57 300 123-4567').value).toBe(
                '+57 300 123-4567'
            )
        })

        it('throws for a number that is too short', () => {
            expect(() => new UserPhone('123')).toThrow('User phone not valid')
        })

        it('throws for a non-numeric string', () => {
            expect(() => new UserPhone('not-a-phone')).toThrow(
                'User phone not valid'
            )
        })

        it('throws for an empty string', () => {
            expect(() => new UserPhone('')).toThrow('User phone not valid')
        })
    })

    describe('UserBirthDate', () => {
        it('accepts a valid past date in YYYY-MM-DD format', () => {
            expect(new UserBirthDate('1990-06-15').value).toBe('1990-06-15')
        })

        it('throws for an invalid format (DD/MM/YYYY)', () => {
            expect(() => new UserBirthDate('15/06/1990')).toThrow(
                'User Birth Date format not valid (YYYY-MM-DD)'
            )
        })

        it('throws for a non-existent date (month 13)', () => {
            expect(() => new UserBirthDate('1990-13-01')).toThrow(
                'User Birth Date not valid date'
            )
        })

        it('throws for a non-existent date (day 32)', () => {
            expect(() => new UserBirthDate('1990-01-32')).toThrow(
                'User Birth Date not valid date'
            )
        })

        it('throws for a future date', () => {
            const tomorrow = new Date()
            tomorrow.setDate(tomorrow.getDate() + 1)
            const future = tomorrow.toISOString().split('T')[0]

            expect(() => new UserBirthDate(future)).toThrow(
                'User Birth Date can not a future date'
            )
        })

        it('throws for today (boundary: not strictly past)', () => {
            const today = new Date().toISOString().split('T')[0]

            expect(() => new UserBirthDate(today)).toThrow(
                'User Birth Date can not a future date'
            )
        })
    })

    describe('UserOccupationStatus', () => {
        it('accepts a valid occupation status', () => {
            expect(new UserOccupationStatus('student').value).toBe('student')
        })

        it('throws when empty', () => {
            expect(() => new UserOccupationStatus('')).toThrow()
        })
    })

    describe('UserUniversity', () => {
        it('accepts a valid university name', () => {
            expect(new UserUniversity('Universidad Nacional').value).toBe(
                'Universidad Nacional'
            )
        })

        it('throws when empty', () => {
            expect(() => new UserUniversity('')).toThrow()
        })
    })

    describe('UserHowFindUs', () => {
        it('accepts a valid value', () => {
            expect(new UserHowFindUs('Instagram').value).toBe('Instagram')
        })

        it('throws when empty', () => {
            expect(() => new UserHowFindUs('')).toThrow()
        })
    })

    describe('UserDisability', () => {
        it('accepts a valid value', () => {
            expect(new UserDisability('none').value).toBe('none')
        })

        it('throws when empty', () => {
            expect(() => new UserDisability('')).toThrow()
        })
    })

    describe('UserIgUsername', () => {
        it('accepts a valid Instagram username', () => {
            expect(new UserIgUsername('@johndoe').value).toBe('@johndoe')
        })

        it('throws when empty', () => {
            expect(() => new UserIgUsername('')).toThrow()
        })
    })

    describe('UserGender', () => {
        it('accepts a valid gender', () => {
            expect(new UserGender('male').value).toBe('male')
        })
    })

    describe('UserCountryOfResidence', () => {
        it('accepts a valid country', () => {
            expect(new UserCountryOfResidence('Colombia').value).toBe(
                'Colombia'
            )
        })
    })

    describe('UserTiktokUsername', () => {
        it('accepts a valid TikTok username', () => {
            expect(new UserTiktokUsername('@johndoe').value).toBe('@johndoe')
        })
    })

    describe('UserFirstName', () => {
        it('accepts a valid first name', () => {
            expect(new UserFirstName('John').value).toBe('John')
        })
    })

    describe('UserSecondName', () => {
        it('accepts a valid second name', () => {
            expect(new UserSecondName('William').value).toBe('William')
        })
    })

    describe('UserThirdName', () => {
        it('accepts a valid third name', () => {
            expect(new UserThirdName('Andrew').value).toBe('Andrew')
        })
    })

    describe('UserLastName', () => {
        it('accepts a valid last name', () => {
            expect(new UserLastName('Doe').value).toBe('Doe')
        })
    })

    describe('UserSecondLastName', () => {
        it('accepts a valid second last name', () => {
            expect(new UserSecondLastName('Smith').value).toBe('Smith')
        })
    })
})
