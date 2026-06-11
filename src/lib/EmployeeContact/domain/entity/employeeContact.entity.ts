import { EmployeeContactId } from '../value-objects/employeeContactId.vo'
import { EmployeeContactName } from '../value-objects/employeeContactName.vo'
import { EmployeeContactPhone } from '../value-objects/employeeContactPhone.vo'
import { EmployeeContactEmployeeId } from '../value-objects/employeeContactEmployeeId.vo'
import { EmployeeContactIsPrimary } from '../value-objects/employeeContactIsPrimary.vo'

export interface IEmployeeContact {
    id: EmployeeContactId
    employeeId: EmployeeContactEmployeeId
    phone: EmployeeContactPhone
    name: EmployeeContactName
    isPrimary: EmployeeContactIsPrimary
}

export class EmployeeContact {
    id: EmployeeContactId
    employeeId: EmployeeContactName
    phone: EmployeeContactPhone
    name: EmployeeContactEmployeeId
    isPrimary: EmployeeContactIsPrimary

    constructor(employeeContact: IEmployeeContact) {
        this.id = employeeContact.id
        this.employeeId = employeeContact.employeeId
        this.phone = employeeContact.phone
        this.name = employeeContact.name
        this.isPrimary = employeeContact.isPrimary
    }

    toPrimitives() {
        return {
            id: this.id.value,
            name: this.name.value,
            employeeId: this.employeeId.value,
            phone: this.phone.value,
            isPrimary: this.isPrimary.value,
        }
    }
}
