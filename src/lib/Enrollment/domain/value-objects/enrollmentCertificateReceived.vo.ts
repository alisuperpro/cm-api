export class EnrollmentCertificateReceived {
    value: boolean

    constructor(value: boolean) {
        this.value = value
        this.validate()
    }

    private validate() {
        if (typeof this.value !== 'boolean') {
            throw new Error('Enrollment certificate received not valid')
        }
    }
}
