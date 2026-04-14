export class UserBirthDate {
    value: string

    constructor(value: string) {
        this.value = value
        this.validate()
    }

    private validate() {
        const datePattern = /^\d{4}-\d{2}-\d{2}$/
        if (!datePattern.test(this.value)) {
            throw new Error('User Birth Date format not valid (YYYY-MM-DD)')
        }

        const [year, month, day] = this.value.split('-').map(Number)

        const birthDate = new Date(year, month - 1, day)

        if (
            birthDate.getFullYear() !== year ||
            birthDate.getMonth() !== month - 1 ||
            birthDate.getDate() !== day
        ) {
            throw new Error('User Birth Date not valid date')
        }

        const currentDate = new Date()
        currentDate.setHours(0, 0, 0, 0)

        if (birthDate >= currentDate) {
            throw new Error('User Birth Date can not a future date')
        }
    }
}
