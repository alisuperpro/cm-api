import { EmployeeId } from '@/lib/AdminUser/domain/value-objects/employeeId.vo'
import { EmployeeName } from '@/lib/AdminUser/domain/value-objects/employeeName.vo'
import { EmployeeNotificationToken } from '@/lib/AdminUser/domain/value-objects/employeeNotificationToken.vo'
import { EmployeeRole } from '@/lib/AdminUser/domain/value-objects/employeeRole.vo'
import { EmployeePosition } from '@/lib/AdminUser/domain/value-objects/employeePosition.vo'
import { EmployeeState } from '@/lib/AdminUser/domain/value-objects/employeeState.vo'
import { EmployeeEmail } from '@/lib/AdminUser/domain/value-objects/employeeEmail.vo'
import { EmployeeDocId } from '@/lib/AdminUser/domain/value-objects/employeeDocId.vo'

export interface IEmployee {
    id: EmployeeId
    notificationToken: EmployeeNotificationToken
    role: EmployeeRole
    name: EmployeeName
    position: EmployeePosition
    state: EmployeeState
    email: EmployeeEmail
    docId: EmployeeDocId
}

export class Employee {
    id: EmployeeId
    notificationToken: EmployeeNotificationToken
    role: EmployeeRole
    name: EmployeeName
    position: EmployeePosition
    state: EmployeeState
    email: EmployeeEmail
    docId: EmployeeDocId

    constructor(employee: IEmployee) {
        this.id = employee.id
        this.notificationToken = employee.notificationToken
        this.role = employee.role
        this.name = employee.name
        this.position = employee.position
        this.state = employee.state
        this.email = employee.email
        this.docId = employee.docId
    }

    toPrimitives() {
        return {
            id: this.id.value,
            notificationToken: this.notificationToken.value,
            role: this.role.value,
            name: this.name.value,
            position: this.position.value,
            state: this.state.value,
            email: this.email.value,
            docId: this.docId.value,
        }
    }
}
