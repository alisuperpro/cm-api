import { Employee } from '@/lib/Employee/domain/entity/employee.entity'
import { EmployeeId } from '@/lib/Employee/domain/value-objects/employeeId.vo'
import { EmployeeNotificationToken } from '@/lib/Employee/domain/value-objects/employeeNotificationToken.vo'

export interface EmployeeRepository {
    create(employee: Employee): Promise<void>
    getAll(): Promise<Employee[]>
    findById(id: EmployeeId): Promise<Employee | null>
    updateNotificatonToken(
        id: EmployeeId,
        token: EmployeeNotificationToken
    ): Promise<void>
}
