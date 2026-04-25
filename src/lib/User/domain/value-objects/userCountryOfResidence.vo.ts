export class UserCountryOfResidence {
    value: string

    constructor(value: string) {
        this.value = value

        this.validate()
    }

    private validate() {
        /*  if (!this.value) {
            throw new Error('User country of residence is required')
        } */
    }
}
