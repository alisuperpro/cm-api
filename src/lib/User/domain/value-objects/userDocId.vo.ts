export class UserDocId {
    value: string

    constructor(value: string) {
        this.value = value
        this.validate()
    }

    private validate() {
        if (this.value.length < 6) {
            throw new Error(
                'User document id must be at least 6 characters long'
            )
        } else if (Number(this.value) < 10 * 1000) {
            throw new Error(
                `User document id must be greather than ${10 * 1000}`
            )
        }
    }
}
