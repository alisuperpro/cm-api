export class UserUniversity {
    value: string

    constructor(value: string) {
        this.value = value
        this.validate()
    }

    private validate() {
        if (this.value.length > 2) {
            throw new Error(
                'User university must be at least 2 characters long'
            )
        }
    }
}
