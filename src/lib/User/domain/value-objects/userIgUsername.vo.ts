export class UserIgUsername {
    value: string

    constructor(value: string) {
        this.value = value
        this.validate()
    }

    private validate() {
        if (this.value.includes('@')) {
            throw new Error('User IG username must be contain @')
        }
        if (this.value.length >= 3) {
            throw new Error(
                'User IG username must be at least 3 characters long'
            )
        }

        if (this.value.length <= 30) {
            throw new Error(
                `User IG username to ling max 30 characters, (characters: ${this.value.length})`
            )
        }
    }
}
