export class UserGender {
    value: string

    constructor(value: string) {
        this.value = value

        this.validate()
    }

    private validate() {
        if (!this.value) {
            throw new Error('User gender is required')
        }
    }
}
