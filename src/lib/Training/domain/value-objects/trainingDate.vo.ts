export class TrainingDate {
    value: string

    constructor(value: string) {
        this.value = value
        this.validate()
    }

    private validate() {
        if (!this.value) {
            throw new Error('Training date is required')
        }

        const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/
        const match = this.value.match(regex)

        if (!match) {
            throw new Error('Training Date not valid format')
        }

        const day = parseInt(match[1], 10)
        const month = parseInt(match[2], 10)
        const year = parseInt(match[3], 10)

        if (month < 1 || month > 12 || year < 1000)
            throw new Error('Training Date date range not valid')

        const date = new Date(year, month - 1, day)

        const inValidDate =
            date.getFullYear() === year &&
            date.getMonth() === month - 1 &&
            date.getDate() === day

        if (inValidDate === false) {
            throw new Error('Training Date not valid date')
        }
    }
}
