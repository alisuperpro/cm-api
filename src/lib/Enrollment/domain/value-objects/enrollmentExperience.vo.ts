export class EnrollmentExperience {
    value: string

    constructor(value: string) {
        this.value = value
        this.validate()
    }

    private validate() {
        if (!this.value) {
            throw new Error('Enrollment experience not valid')
        }
    }
}
