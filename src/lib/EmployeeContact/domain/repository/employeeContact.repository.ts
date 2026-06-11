import { EmployeeContact } from '../entity/employeeContact.entity'
import { EmployeeContactEmployeeId } from '../value-objects/employeeContactEmployeeId.vo'

export interface EmployeeContactRepository {
    create(contact: EmployeeContact): Promise<void>
    findByEmployeeId(
        employeeId: EmployeeContactEmployeeId
    ): Promise<EmployeeContact[] | null>
}
