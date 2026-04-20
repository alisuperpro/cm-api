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
} as const

// ─── Helpers ─────────────────────────────────────────────────────────────────
type UserOverrides = {
    id?: UserId
    fullName?: UserFullName
    docId?: UserDocId
    email?: UserEmail
    phone?: UserPhone
    birthDate?: UserBirthDate
    occupationStatus?: UserOccupationStatus
    university?: UserUniversity
    howFindUs?: UserHowFindUs
    disability?: UserDisability
    igUsername?: UserIgUsername
}

const makeUser = (overrides: UserOverrides = {}) =>
    new User(
        overrides.id ?? new UserId(FIXTURES.id),
        overrides.fullName ?? new UserFullName(FIXTURES.fullName),
        overrides.docId ?? new UserDocId(FIXTURES.docId),
        overrides.email ?? new UserEmail(FIXTURES.email),
        overrides.phone ?? new UserPhone(FIXTURES.phone),
        overrides.birthDate ?? new UserBirthDate(FIXTURES.birthDate),
        overrides.occupationStatus ??
            new UserOccupationStatus(FIXTURES.occupationStatus),
        overrides.university ?? new UserUniversity(FIXTURES.university),
        overrides.howFindUs ?? new UserHowFindUs(FIXTURES.howFindUs),
        overrides.disability ?? new UserDisability(FIXTURES.disability),
        overrides.igUsername ?? new UserIgUsername(FIXTURES.igUsername)
    )

// ─── Tests ───────────────────────────────────────────────────────────────────

describe('User Entity', () => {
    describe('construction', () => {
        it('should create a User with all properties', () => {
            const user = makeUser()

            expect(user.id.value).toBe(FIXTURES.id)
            expect(user.fullName.value).toBe(FIXTURES.fullName)
            expect(user.docId.value).toBe(FIXTURES.docId)
            expect(user.email.value).toBe(FIXTURES.email)
            expect(user.phone.value).toBe(FIXTURES.phone)
            expect(user.birthDate.value).toBe(FIXTURES.birthDate)
        })
    })

    // ── Value Objects ─────────────────────────────────────────────────────────

    describe('UserId', () => {
        it('accepts a valid id', () => {
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

        it('accepts the minimum valid value (10000)', () => {
            expect(new UserDocId('100000').value).toBe('100000')
        })

        it('throws when shorter than 6 characters', () => {
            expect(() => new UserDocId('12345')).toThrow(
                'User document id must be at least 6 characters long'
            )
        })

        it('throws when numeric value is less than 10000', () => {
            // 6 chars but value < 10_000
            expect(() => new UserDocId('009999')).toThrow(
                'User document id must be greather than 10000'
            )
        })
    })

    describe('UserPhone', () => {
        it('accepts an international format with country code', () => {
            expect(new UserPhone('+573001234567').value).toBe('+573001234567')
        })

        it('accepts a national format (10 digits)', () => {
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

        it('throws for today (not a past date)', () => {
            const today = new Date().toISOString().split('T')[0]

            expect(() => new UserBirthDate(today)).toThrow(
                'User Birth Date can not a future date'
            )
        })
    })

    // ── VOs inferidos — ajustar si las validaciones reales difieren ───────────

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
})
