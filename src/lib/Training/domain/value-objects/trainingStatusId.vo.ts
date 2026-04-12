export class TrainingStatusId {
    value: string

    constructor(value: string) {
        this.value = value
        this.validate()
    }

    private validate() {
        if (!this.value) {
            throw new Error('Trainig status id not valid')
        }

        if (this.value.length < 5) {
            throw new Error(
                'Training status id must be at least 5 characters long'
            )
        }
    }
}
