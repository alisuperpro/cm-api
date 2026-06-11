import { EmployeeContactCreate } from '@/lib/EmployeeContact/application/use-case/employeeContactCreate.uc'
import { EmployeeContactFindByEmployeeId } from '@/lib/EmployeeContact/application/use-case/employeeContactFindByEmployeeId.uc'

import { EmployeeContactTursoRepository } from '@/lib/EmployeeContact/infrastructure/repository/employeeContact.repository'

const EmployeeContactRepository = new EmployeeContactTursoRepository()

export const employeeContactServices = {
    create: new EmployeeContactCreate(EmployeeContactRepository),
    findByEmployeeId: new EmployeeContactFindByEmployeeId(
        EmployeeContactRepository
    ),
}
