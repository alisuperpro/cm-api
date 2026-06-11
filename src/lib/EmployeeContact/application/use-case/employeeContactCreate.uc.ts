import { EmployeeContactRepository } from '@/lib/EmployeeContact/domain/repository/employeeContact.repository'
import { EmployeeContactCreateDTO } from '../dto/employeeContactCreate.dto'
import { EmployeeContact } from '@/lib/EmployeeContact/domain/entity/employeeContact.entity'
import { EmployeeContactId } from '@/lib/EmployeeContact/domain/value-objects/employeeContactId.vo'
import { EmployeeContactEmployeeId } from '@/lib/EmployeeContact/domain/value-objects/employeeContactEmployeeId.vo'
import { EmployeeContactPhone } from '@/lib/EmployeeContact/domain/value-objects/employeeContactPhone.vo'
import { EmployeeContactName } from '@/lib/EmployeeContact/domain/value-objects/employeeContactName.vo'
import { EmployeeContactIsPrimary } from '@/lib/EmployeeContact/domain/value-objects/employeeContactIsPrimary.vo'

export class EmployeeContactCreate {
    constructor(private repository: EmployeeContactRepository) {}

    async run(dto: EmployeeContactCreateDTO) {
        const contact = new EmployeeContact({
            id: new EmployeeContactId(dto.id),
            employeeId: new EmployeeContactEmployeeId(dto.employeeId),
            phone: new EmployeeContactPhone(dto.phone),
            name: new EmployeeContactName(dto.name),
            isPrimary: new EmployeeContactIsPrimary(dto.isPrimary),
        })

        await this.repository.create(contact)
    }
}
