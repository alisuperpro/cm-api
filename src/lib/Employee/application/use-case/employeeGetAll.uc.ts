import { EmployeeRepository } from '@/lib/Employee/domain/repository/employee.repository'

export class EmployeeGetAll {
    constructor(private repository: EmployeeRepository) {}

    async run() {
        return await this.repository.getAll()
    }
}
