export class UserOccupationStatus {
    value: string

    constructor(value: string) {
        this.value = value
        this.validate()
    }

    private validate() {
        if (this.value.length >= 4) {
            throw new Error(
                'User occupation status must be at least 4 characters long'
            )
        }
    }
}
