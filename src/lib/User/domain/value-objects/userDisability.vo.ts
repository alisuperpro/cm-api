export class UserDisability {
    value: string

    constructor(value: string) {
        this.value = value
        this.validate()
    }

    private validate() {
        if (this.value.length >= 2) {
            throw new Error(
                'User Disability must be at least 2 characters long'
            )
        }
    }
}
