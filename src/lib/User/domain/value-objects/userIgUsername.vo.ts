export class UserIgUsername {
    readonly value: string

    constructor(value: string) {
        this.value = value
        this.validate()
    }

    private validate() {
        if (!this.value.startsWith('@')) {
            throw new Error('User IG username must start with @')
        }

        const usernameWithoutAt = this.value.startsWith('@')
            ? this.value.slice(1)
            : this.value

        const igRegex = /^(?!.*\.\.)(?!\.)(?!.*\.$)[a-zA-Z0-9._]{3,30}$/

        if (!igRegex.test(usernameWithoutAt)) {
            throw new Error(
                'Invalid IG username format. Must be 3-30 characters, only letters, numbers, dots (.), underscores (_), no consecutive dots, and cannot start or end with a dot.'
            )
        }
    }
}
