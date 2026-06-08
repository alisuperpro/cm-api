import { EmployeeCreate } from '@/lib/Employee/application/use-case/employeeCreate.uc'
import { EmployeeFindById } from '@/lib/Employee/application/use-case/employeeFindById.uc'
import { EmployeeGetAll } from '@/lib/Employee/application/use-case/employeeGetAll.uc'
import { EmployeeUpdateNotoficationToken } from '@/lib/Employee/application/use-case/employeeUpdateNotificationToken.uc'
import { EmployeeTursoRepository } from '@/lib/Employee/infrastructure/repository/employeeTurso.repository'

const employeeRepository = new EmployeeTursoRepository()

export const employeeServices = {
    create: new EmployeeCreate(employeeRepository),
    getAll: new EmployeeGetAll(employeeRepository),
    findById: new EmployeeFindById(employeeRepository),
    updateNotificationToken: new EmployeeUpdateNotoficationToken(
        employeeRepository
    ),
}
