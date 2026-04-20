import { Enrollment } from '../entity/enrollment.entity'
import { EnrollmentId } from '../value-objects/enrollmentId.vo'
import { EnrollmentTrainingId } from '../value-objects/enrollmentTrainingId.vo'
import { EnrollmentUserId } from '../value-objects/enrollmentUserId.vo'
import { EnrollmentHowFind } from '../value-objects/enrollmentHowFind.vo'
import { EnrollmentExperience } from '../value-objects/enrollmentExperience.vo'
import { EnrollmentAdditionalInfo } from '../value-objects/enrollmentAdditionalInfo.vo'
import { EnrollmentPayRef } from '../value-objects/enrollmentPayRef.vo'
import { EnrollmentPayImg } from '../value-objects/enrollmentPayImg.vo'
import { EnrollmentIsArrived } from '../value-objects/enrollmentIsArrived.vo'
import { EnrollmentCertificateReceived } from '../value-objects/enrollmentCertificateReceived.vo'
import { EnrollmentPayConfirmed } from '../value-objects/enrollmentPayConfirmed.vo'
import { EnrollmentCreatedAt } from '../value-objects/enrollmentCreatedAt.vo'

// ─── Fixtures ────────────────────────────────────────────────────────────────

const FIXTURES = {
    id: '123e4567-e89b-12d3-a456-426614174000',
    trainingId: '123e4567-e89b-12d3-a456-426614174001',
    userId: '123e4567-e89b-12d3-a456-426614174002',
    howFind: 'Instagram',
    experience: 'Ninguna experiencia previa',
    additionalInfo: 'Información adicional',
    payRef: 'REF-2025-001',
    payImg: 'https://cdn.example.com/pay.jpg',
    isArrived: false,
    certificateReceived: false,
    payConfirmed: false,
    createdAt: '2025-01-01T00:00:00.000Z',
} as const

// ─── Helpers ─────────────────────────────────────────────────────────────────

type EnrollmentOverrides = {
    id?: EnrollmentId
    trainingId?: EnrollmentTrainingId
    userId?: EnrollmentUserId
    howFind?: EnrollmentHowFind
    experience?: EnrollmentExperience
    additionalInfo?: EnrollmentAdditionalInfo
    payRef?: EnrollmentPayRef
    payImg?: EnrollmentPayImg
    isArrived?: EnrollmentIsArrived
    certificateReceived?: EnrollmentCertificateReceived
    payConfirmed?: EnrollmentPayConfirmed
    createdAt?: EnrollmentCreatedAt
}

const makeEnrollment = (overrides: EnrollmentOverrides = {}) =>
    new Enrollment(
        overrides.id ?? new EnrollmentId(FIXTURES.id),
        overrides.trainingId ?? new EnrollmentTrainingId(FIXTURES.trainingId),
        overrides.userId ?? new EnrollmentUserId(FIXTURES.userId),
        overrides.howFind ?? new EnrollmentHowFind(FIXTURES.howFind),
        overrides.experience ?? new EnrollmentExperience(FIXTURES.experience),
        overrides.additionalInfo ??
            new EnrollmentAdditionalInfo(FIXTURES.additionalInfo),
        overrides.payRef ?? new EnrollmentPayRef(FIXTURES.payRef),
        overrides.payImg ?? new EnrollmentPayImg(FIXTURES.payImg),
        overrides.isArrived ?? new EnrollmentIsArrived(FIXTURES.isArrived),
        overrides.certificateReceived ??
            new EnrollmentCertificateReceived(FIXTURES.certificateReceived),
        overrides.payConfirmed ??
            new EnrollmentPayConfirmed(FIXTURES.payConfirmed),
        overrides.createdAt ?? new EnrollmentCreatedAt(FIXTURES.createdAt)
    )

// ─── Tests ───────────────────────────────────────────────────────────────────

describe('Enrollment Entity', () => {
    describe('construction', () => {
        it('should create an Enrollment with all properties', () => {
            const enrollment = makeEnrollment()

            expect(enrollment.id.value).toBe(FIXTURES.id)
            expect(enrollment.trainingId.value).toBe(FIXTURES.trainingId)
            expect(enrollment.userId.value).toBe(FIXTURES.userId)
            expect(enrollment.howFind.value).toBe(FIXTURES.howFind)
            expect(enrollment.experience.value).toBe(FIXTURES.experience)
            expect(enrollment.additionalInfo.value).toBe(
                FIXTURES.additionalInfo
            )
            expect(enrollment.payRef.value).toBe(FIXTURES.payRef)
            expect(enrollment.payImg.value).toBe(FIXTURES.payImg)
            expect(enrollment.isArrived.value).toBe(false)
            expect(enrollment.certificateReceived.value).toBe(false)
            expect(enrollment.payConfirmed.value).toBe(false)
            expect(enrollment.createdAt.value).toBe(FIXTURES.createdAt)
        })

        it('should create an Enrollment with null additionalInfo', () => {
            const enrollment = makeEnrollment({
                additionalInfo: new EnrollmentAdditionalInfo(null),
            })

            expect(enrollment.additionalInfo.value).toBeNull()
        })
    })

    describe('markAsArrived()', () => {
        it('should set isArrived to true', () => {
            const enrollment = makeEnrollment()

            expect(enrollment.isArrived.value).toBe(false)
            enrollment.markAsArrived()
            expect(enrollment.isArrived.value).toBe(true)
        })

        it('should remain true when called multiple times', () => {
            const enrollment = makeEnrollment()

            enrollment.markAsArrived()
            enrollment.markAsArrived()

            expect(enrollment.isArrived.value).toBe(true)
        })
    })

    describe('markCertificateReceived()', () => {
        it('should set certificateReceived to true', () => {
            const enrollment = makeEnrollment()

            expect(enrollment.certificateReceived.value).toBe(false)
            enrollment.markCertificateReceived()
            expect(enrollment.certificateReceived.value).toBe(true)
        })

        it('should remain true when called multiple times', () => {
            const enrollment = makeEnrollment()

            enrollment.markCertificateReceived()
            enrollment.markCertificateReceived()

            expect(enrollment.certificateReceived.value).toBe(true)
        })
    })

    // ── Value Objects ─────────────────────────────────────────────────────────

    describe('EnrollmentId', () => {
        it('accepts a valid id', () => {
            expect(new EnrollmentId(FIXTURES.id).value).toBe(FIXTURES.id)
        })

        it('throws when value is empty', () => {
            expect(() => new EnrollmentId('')).toThrow(
                'Enrollment Id not valid'
            )
        })
    })

    describe('EnrollmentTrainingId', () => {
        it('accepts a valid training id', () => {
            expect(new EnrollmentTrainingId(FIXTURES.trainingId).value).toBe(
                FIXTURES.trainingId
            )
        })

        it('throws when value is empty', () => {
            expect(() => new EnrollmentTrainingId('')).toThrow(
                'Enrollment training id not valid'
            )
        })
    })

    describe('EnrollmentUserId', () => {
        it('accepts a valid user id', () => {
            expect(new EnrollmentUserId(FIXTURES.userId).value).toBe(
                FIXTURES.userId
            )
        })

        it('throws when value is empty', () => {
            expect(() => new EnrollmentUserId('')).toThrow(
                'Enrollment user id not valid'
            )
        })
    })

    describe('EnrollmentHowFind', () => {
        it('accepts a valid value', () => {
            expect(new EnrollmentHowFind('Instagram').value).toBe('Instagram')
        })

        it('throws when value is empty', () => {
            expect(() => new EnrollmentHowFind('')).toThrow(
                'Enrollment how find not valid'
            )
        })
    })

    describe('EnrollmentExperience', () => {
        it('accepts a valid value', () => {
            expect(new EnrollmentExperience('Ninguna').value).toBe('Ninguna')
        })

        it('throws when value is empty', () => {
            expect(() => new EnrollmentExperience('')).toThrow(
                'Enrollment experience not valid'
            )
        })
    })

    describe('EnrollmentAdditionalInfo', () => {
        it('accepts a valid string', () => {
            expect(new EnrollmentAdditionalInfo('Info adicional').value).toBe(
                'Info adicional'
            )
        })

        it('accepts null', () => {
            expect(new EnrollmentAdditionalInfo(null).value).toBeNull()
        })
    })

    describe('EnrollmentPayRef', () => {
        it('accepts a valid pay reference', () => {
            expect(new EnrollmentPayRef('REF-001').value).toBe('REF-001')
        })

        it('throws when value is empty', () => {
            expect(() => new EnrollmentPayRef('')).toThrow(
                'Enrollment pay ref not valid'
            )
        })
    })

    describe('EnrollmentPayImg', () => {
        it('accepts a valid url', () => {
            expect(new EnrollmentPayImg(FIXTURES.payImg).value).toBe(
                FIXTURES.payImg
            )
        })

        it('throws when value is empty', () => {
            expect(() => new EnrollmentPayImg('')).toThrow(
                'Enrollment pay img not valid'
            )
        })
    })

    describe('EnrollmentIsArrived', () => {
        it('accepts false as initial value', () => {
            expect(new EnrollmentIsArrived(false).value).toBe(false)
        })

        it('accepts true', () => {
            expect(new EnrollmentIsArrived(true).value).toBe(true)
        })

        it('throws when value is not a boolean', () => {
            // @ts-ignore – intentional invalid input
            expect(() => new EnrollmentIsArrived('true')).toThrow(
                'Enrollment is arrived not valid'
            )
        })
    })

    describe('EnrollmentCertificateReceived', () => {
        it('accepts false as initial value', () => {
            expect(new EnrollmentCertificateReceived(false).value).toBe(false)
        })

        it('accepts true', () => {
            expect(new EnrollmentCertificateReceived(true).value).toBe(true)
        })

        it('throws when value is not a boolean', () => {
            // @ts-ignore – intentional invalid input
            expect(() => new EnrollmentCertificateReceived('false')).toThrow(
                'Enrollment certificate received not valid'
            )
        })
    })

    describe('EnrollmentPayConfirmed', () => {
        it('accepts false as initial value', () => {
            expect(new EnrollmentPayConfirmed(false).value).toBe(false)
        })

        it('accepts true', () => {
            expect(new EnrollmentPayConfirmed(true).value).toBe(true)
        })

        it('throws when value is not a boolean', () => {
            // @ts-ignore – intentional invalid input
            expect(() => new EnrollmentPayConfirmed(1)).toThrow(
                'Enrollment pay confirmed it to be boolean'
            )
        })
    })

    describe('EnrollmentCreatedAt', () => {
        it('accepts a valid ISO date string', () => {
            const iso = new Date().toISOString()
            expect(new EnrollmentCreatedAt(iso).value).toBe(iso)
        })

        it('throws when value is empty', () => {
            expect(() => new EnrollmentCreatedAt('')).toThrow(
                'Enrollment created at not valid'
            )
        })
    })
})
