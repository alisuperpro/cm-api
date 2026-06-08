import { EmployeeContactId } from '../value-objects/employeeContactId.vo'
import { EmployeeContactName } from '../value-objects/employeeContactName.vo'
import { EmployeeContactPhone } from '../value-objects/employeeContactPhone.vo'
import { EmployeeContactUserId } from '../value-objects/employeeContactEmployeeId.vo'

export interface IEmployeeContact {
    id: EmployeeContactId
    userId: EmployeeContactName
    phone: EmployeeContactPhone
    name: EmployeeContactUserId
}

export class EmployeeContact {
    id: EmployeeContactId
    userId: EmployeeContactName
    phone: EmployeeContactPhone
    name: EmployeeContactUserId

    constructor(employeeContact: IEmployeeContact) {
        this.id = employeeContact.id
        this.userId = employeeContact.userId
        this.phone = employeeContact.phone
        this.name = employeeContact.name
    }

    toPrimitives() {
        return {
            id: this.id.value,
            name: this.name.value,
            userId: this.userId.value,
            phone: this.phone.value,
        }
    }
}
