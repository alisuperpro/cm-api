export class EmailSystemPort {
    value: number

    constructor(value: number) {
        this.value = value
        this.validate()
    }

    private validate() {
        if (!this.value) {
            throw new Error('Email system port is required')
        }
    }
}
