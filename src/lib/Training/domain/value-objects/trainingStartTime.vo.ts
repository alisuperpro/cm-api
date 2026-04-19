export class TrainingStartTime {
    value: string

    constructor(value: string) {
        this.value = value
        this.validate()
    }

    private validate() {
        if (!this.value) {
            throw new Error('Training start time is required')
        }

        const regex = /^[0-9]{2}:[0-9]{2}$/i

        if (!regex.test(this.value)) {
            throw new Error('Training start time not valid format')
        }
    }
}
