import { EmployeeNotFoundError } from '@/lib/AdminUser/domain/errors/employeeNotFoundError.error'
import { EmployeeRepository } from '@/lib/AdminUser/domain/repository/employee.repository'
import { EmployeeId } from '@/lib/AdminUser/domain/value-objects/employeeId.vo'

export class EmployeeFindById {
    constructor(private repository: EmployeeRepository) {}

    async run(id: string) {
        const adminUser = await this.repository.findById(new EmployeeId(id))

        if (!adminUser) throw new EmployeeNotFoundError('Admin user not found')

        return adminUser
    }
}
