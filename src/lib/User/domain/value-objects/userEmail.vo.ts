export class UserEmail {
    value: string

    constructor(value: string) {
        this.value = value
        this.validate()
    }

    private validate() {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if (!regex.test(this.value)) {
            throw new Error('User email not valid')
        }
    }
}
