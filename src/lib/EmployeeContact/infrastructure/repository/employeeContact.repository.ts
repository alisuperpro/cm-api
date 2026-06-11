import { TursoDatabase } from '@/lib/shared/insfrastructure/database/turso.db'
import { EmployeeContactRepository } from '../../domain/repository/employeeContact.repository'
import { EmployeeContact } from '../../domain/entity/employeeContact.entity'
import { EmployeeContactEmployeeId } from '../../domain/value-objects/employeeContactEmployeeId.vo'
import { EmployeeContactId } from '../../domain/value-objects/employeeContactId.vo'
import { EmployeeContactPhone } from '../../domain/value-objects/employeeContactPhone.vo'
import { EmployeeContactName } from '../../domain/value-objects/employeeContactName.vo'
import { EmployeeContactIsPrimary } from '../../domain/value-objects/employeeContactIsPrimary.vo'

interface EmployeeContactTurso {
    id: string
    employeeId: string
    phone: string
    name: string
    is_primary: boolean
}

export class EmployeeContactTursoRepository implements EmployeeContactRepository {
    private db = TursoDatabase.getInstance().getClient()
    private tableName = 'employee_contact'

    async create(contact: EmployeeContact): Promise<void> {
        await this.db.execute({
            sql: `INSERT INTO ${this.tableName} (id, employee_id, name, phone, is_primary) VALUES (?,?,?,?,?)`,
            args: [
                contact.id.value,
                contact.employeeId.value,
                contact.phone.value,
                contact.name.value,
                contact.isPrimary.value,
            ],
        })
    }

    async findByEmployeeId(
        employeeId: EmployeeContactEmployeeId
    ): Promise<EmployeeContact[] | null> {
        const query = {
            sql: `SELECT * FROM ${this.tableName} WHERE employee_id = ?`,
            args: [employeeId.value],
        }

        const result = await this.db.execute(query)

        if (result.rows.length <= 0) return null

        const contacts = result.rows.map((contact) =>
            this.mapToDomain(contact as unknown as EmployeeContactTurso)
        )

        return contacts
    }

    private mapToDomain(contact: EmployeeContactTurso) {
        return new EmployeeContact({
            id: new EmployeeContactId(contact.id),
            employeeId: new EmployeeContactEmployeeId(contact.employeeId),
            phone: new EmployeeContactPhone(contact.phone),
            name: new EmployeeContactName(contact.name),
            isPrimary: new EmployeeContactIsPrimary(contact.is_primary),
        })
    }
}
