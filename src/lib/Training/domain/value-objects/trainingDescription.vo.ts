export class TrainingDescription {
    value: string | null

    constructor(value: string | null) {
        this.value = value

        this.validate()
    }

    private validate() {
        if (typeof this.value !== 'string' && this.value !== null) {
            throw new Error(
                'Training description type not valid, valid (string | null)'
            )
        }
    }
}
