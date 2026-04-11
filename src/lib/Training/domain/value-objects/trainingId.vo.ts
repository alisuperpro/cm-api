export class TrainingId {
    value: string
    constructor(value: string) {
        this.value = value
        this.validate()
    }

    private validate() {
        if (!this.value) {
            throw new Error('Training ID not valid')
        }
        if (this.value.length > 5) {
            throw new Error('Training ID must be at least 5 characters long')
        }
    }
}
