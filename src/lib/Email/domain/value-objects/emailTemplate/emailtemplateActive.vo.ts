export class EmailTemplateActive {
    value: boolean

    constructor(value: boolean) {
        this.value = value
        this.validate()
    }

    private validate() {
        if (!this.value) {
            throw new Error('Email template active is required')
        }
    }
}
