import { Employee } from '@/lib/Employee/domain/entity/employee.entity'
import { EmployeeRepository } from '@/lib/Employee/domain/repository/employee.repository'
import { EmployeeId } from '@/lib/Employee/domain/value-objects/employeeId.vo'
import { EmployeeName } from '@/lib/Employee/domain/value-objects/employeeName.vo'
import { EmployeeNotificationToken } from '@/lib/Employee/domain/value-objects/employeeNotificationToken.vo'
import { EmployeeRole } from '@/lib/Employee/domain/value-objects/employeeRole.vo'
import { EmployeeDTO } from '@/lib/Employee/application/dto/employeeCreate.dto'
import { EmployeePosition } from '@/lib/Employee/domain/value-objects/employeePosition.vo'
import { EmployeeDocId } from '@/lib/Employee/domain/value-objects/employeeDocId.vo'
import { EmployeeState } from '@/lib/Employee/domain/value-objects/employeeState.vo'
import { EmployeeEmail } from '@/lib/Employee/domain/value-objects/employeeEmail.vo'

export class EmployeeCreate {
    constructor(private repository: EmployeeRepository) {}

    async run(employee: EmployeeDTO) {
        const employeeObject = new Employee({
            id: new EmployeeId(employee.id),
            name: new EmployeeName(employee.name),
            notificationToken: new EmployeeNotificationToken(
                employee.notificationToken
            ),
            role: new EmployeeRole(employee.role),
            position: new EmployeePosition(employee.position),
            state: new EmployeeState(employee.state),
            email: new EmployeeEmail(employee.email),
            docId: new EmployeeDocId(employee.docId),
        })

        return await this.repository.create(employeeObject)
    }
}
