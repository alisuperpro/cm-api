import { EmployeeRepository } from '@/lib/AdminUser/domain/repository/employee.repository'
import { EmployeeId } from '@/lib/AdminUser/domain/value-objects/employeeId.vo'
import { EmployeeNotificationToken } from '@/lib/AdminUser/domain/value-objects/employeeNotificationToken.vo'
import { EmployeeUpdateNotificationTokenDTO } from '@/lib/AdminUser/application/dto/employeeUpdateNotificationToken.dto'

export class EmployeeUpdateNotoficationToken {
    constructor(private repository: EmployeeRepository) {}

    async run(data: EmployeeUpdateNotificationTokenDTO) {
        return await this.repository.updateNotificatonToken(
            new EmployeeId(data.id),
            new EmployeeNotificationToken(data.token)
        )
    }
}
