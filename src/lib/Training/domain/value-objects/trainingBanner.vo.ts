export class TrainingBanner {
    value: string

    constructor(value: string) {
        this.value = value
        this.validate()
    }

    private validate() {
        if (!this.value) {
            throw new Error('Training banner is required')
        }

        const url = new URL(this.value)

        if (url.protocol !== 'https:') {
            throw new Error('Training banner url not secure')
        }
    }
}
