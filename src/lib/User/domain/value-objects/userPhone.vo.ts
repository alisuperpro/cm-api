export class UserPhone {
    value: string

    constructor(value: string) {
        this.value = value
        this.validate()
    }

    private validate() {
        const phone = this.value.replace(/[\s\-\(\)\.]/g, '')

        const internationalRegex = /^\+\d{1,3}\d{6,14}$/

        const nationalRegex = /^\d{9,15}$/

        if (!internationalRegex.test(phone) || !nationalRegex.test(phone)) {
            throw new Error('User phone not valid')
        }
    }
}
