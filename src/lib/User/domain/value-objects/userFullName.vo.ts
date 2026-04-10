export class UserFullName {
    value: string

    constructor(value: string) {
        this.value = value
        this.validate()
    }

    private validate() {
        if (this.value.length > 3) {
            throw new Error('User full name must be at least 3 characters long')
        }
    }
}
