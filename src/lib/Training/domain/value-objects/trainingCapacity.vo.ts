export class TrainingCapacity {
    value: number

    constructor(value: number) {
        this.value = value
        this.validate()
    }

    private validate() {
        if (!this.value) {
            throw new Error('Training capacity is required')
        }
        if (this.value < 0) {
            throw new Error('Training capacity must be positive')
        }
    }
}
