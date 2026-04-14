export class UserHowFindUs {
    value: string

    constructor(value: string) {
        this.value = value
        this.validate()
    }

    private validate() {
        if (this.value.length < 5) {
            throw new Error(
                'User how find us must be at least 5 characters long'
            )
        }
    }
}
