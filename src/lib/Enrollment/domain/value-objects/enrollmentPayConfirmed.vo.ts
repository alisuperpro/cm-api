export class EnrollmentPayConfirmed {
    value: boolean

    constructor(value: boolean) {
        this.value = value
        this.validate()
    }

    private validate() {
        if (typeof this.value !== 'boolean') {
            throw new Error('Enrollment pay confirmed it to be boolean')
        }
    }
}
