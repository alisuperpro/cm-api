export class TrainingTitle {
    value: string

    constructor(value: string) {
        this.value = value
        this.validate()
    }

    private validate() {
        if (!this.value) {
            throw new Error('Training title not valid')
        }
        if (this.value.length < 3) {
            throw new Error('Training title must be at least 3 characters long')
        }
    }
}
