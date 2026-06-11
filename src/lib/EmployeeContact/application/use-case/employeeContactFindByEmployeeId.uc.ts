import { EmployeeContactNotFoundError } from '../../domain/errors/employeeContactNotFoundError.error'
import { EmployeeContactRepository } from '../../domain/repository/employeeContact.repository'
import { EmployeeContactEmployeeId } from '../../domain/value-objects/employeeContactEmployeeId.vo'

export class EmployeeContactFindByEmployeeId {
    constructor(private repository: EmployeeContactRepository) {}

    async run(employeeId: string) {
        const contacts = this.repository.findByEmployeeId(
            new EmployeeContactEmployeeId(employeeId)
        )

        if (!contacts)
            throw new EmployeeContactNotFoundError(
                `Employee contact not found ${employeeId}`
            )

        return contacts
    }
}
