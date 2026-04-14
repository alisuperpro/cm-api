export class EmailSystemActive {
    value: boolean

    constructor(value: boolean) {
        this.value = value
        this.validate()
    }

    private validate() {
        if (!this.value) {
            throw new Error('Email system active is required')
        }
    }
}
