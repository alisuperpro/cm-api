export class UserIgUsername {
    readonly value: string

    constructor(value: string) {
        this.value = value
        this.validate()
    }

    private validate() {
        if (this.value.includes('@')) {
            throw new Error('User IG username must not contain @')
        }

        const igRegex = /^(?!.*\.\.)(?!\.)(?!.*\.$)[a-zA-Z0-9._]{3,30}$/

        if (!igRegex.test(this.value)) {
            throw new Error(
                'Invalid IG username format. Must be 3-30 characters, only letters, numbers, dots (.), underscores (_), no consecutive dots, and cannot start or end with a dot.'
            )
        }
    }
}
