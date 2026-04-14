export class EmailTemplateHtml {
    value: string

    constructor(value: string) {
        this.value = value
        this.validate()
    }

    private validate() {
        if (!this.value) {
            throw new Error('Email template html is required')
        }
    }
}
