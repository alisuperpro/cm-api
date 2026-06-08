import { EmployeeRepository } from '@/lib/Employee/domain/repository/employee.repository'
import { EmployeeId } from '@/lib/Employee/domain/value-objects/employeeId.vo'
import { EmployeeNotificationToken } from '@/lib/Employee/domain/value-objects/employeeNotificationToken.vo'
import { EmployeeUpdateNotificationTokenDTO } from '@/lib/Employee/application/dto/employeeUpdateNotificationToken.dto'

export class EmployeeUpdateNotoficationToken {
    constructor(private repository: EmployeeRepository) {}

    async run(data: EmployeeUpdateNotificationTokenDTO) {
        return await this.repository.updateNotificatonToken(
            new EmployeeId(data.id),
            new EmployeeNotificationToken(data.token)
        )
    }
}
