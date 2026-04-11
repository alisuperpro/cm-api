export class TrainingDate {
    value: string

    constructor(value: string) {
        this.value = value
        this.validate()
    }

    private validate() {
        if (!this.value) {
            throw new Error('Training date not valid')
        }
        if (new Date(this.value) > new Date()) {
            throw new Error('Training date not has been pas')
        }
    }
}
