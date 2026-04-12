export class EnrollmentCreatedAt {
    value: string

    constructor(value: string) {
        this.value = value
        this.validate()
    }

    private validate() {
        if (!this.value) {
            throw new Error('Enrollment created at not valid')
        }
    }
}
