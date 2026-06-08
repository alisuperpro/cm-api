import { EmployeeRepository } from '@/lib/AdminUser/domain/repository/employee.repository'

export class EmployeeGetAll {
    constructor(private repository: EmployeeRepository) {}

    async run() {
        return await this.repository.getAll()
    }
}
