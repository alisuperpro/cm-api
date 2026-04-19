export class TrainingCreatedAt {
    value: string

    constructor(value: string) {
        this.value = value
        this.validate()
    }

    private validate() {
        if (!this.value) {
            throw new Error('Training created at is required')
        }
        if (new Date(this.value) > new Date()) {
            throw new Error('Training created at can not be past')
        }
    }
}
