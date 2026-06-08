import { Employee } from '@/lib/AdminUser/domain/entity/employee.entity'
import { EmployeeId } from '@/lib/AdminUser/domain/value-objects/employeeId.vo'
import { EmployeeNotificationToken } from '@/lib/AdminUser/domain/value-objects/employeeNotificationToken.vo'

export interface EmployeeRepository {
    create(employee: Employee): Promise<void>
    getAll(): Promise<Employee[]>
    findById(id: EmployeeId): Promise<Employee | null>
    updateNotificatonToken(
        id: EmployeeId,
        token: EmployeeNotificationToken
    ): Promise<void>
}
