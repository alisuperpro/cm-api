export class TrainingStatusStatus {
    value: string

    constructor(value: string) {
        this.value = value
        this.validate()
    }

    private validate() {
        if (!this.value) {
            throw new Error('Training status not valid')
        }
    }
}
