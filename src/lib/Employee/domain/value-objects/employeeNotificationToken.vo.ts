export class EmployeeNotificationToken {
    value: string

    constructor(value: string) {
        this.value = value
        this.validate()
    }

    private validate() {
        if (!this.value) {
            throw new Error('Admin user notification token not valid')
        }
    }
}
