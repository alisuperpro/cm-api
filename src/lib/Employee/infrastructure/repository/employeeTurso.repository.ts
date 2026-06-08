import { TursoDatabase } from '@/lib/shared/insfrastructure/database/turso.db'
import { Employee } from '@/lib/Employee/domain/entity/employee.entity'
import { EmployeeRepository } from '@/lib/Employee/domain/repository/employee.repository'
import { EmployeeId } from '@/lib/Employee/domain/value-objects/employeeId.vo'
import { EmployeeName } from '@/lib/Employee/domain/value-objects/employeeName.vo'
import { EmployeeNotificationToken } from '@/lib/Employee/domain/value-objects/employeeNotificationToken.vo'
import { EmployeeRole } from '@/lib/Employee/domain/value-objects/employeeRole.vo'
import { EmployeePosition } from '../../domain/value-objects/employeePosition.vo'
import { EmployeeState } from '../../domain/value-objects/employeeState.vo'
import { EmployeeEmail } from '../../domain/value-objects/employeeEmail.vo'
import { EmployeeDocId } from '../../domain/value-objects/employeeDocId.vo'

type EmployeeTurso = {
    id: string
    notification_token: string
    role: string
    name: string
    position: string
    state: string
    email: string
    doc_id: string
}

export class EmployeeTursoRepository implements EmployeeRepository {
    private db = TursoDatabase.getInstance().getClient()
    private tableName = 'employee'

    async create(employee: Employee): Promise<void> {
        await this.db.execute({
            sql: `INSERT INTO ${this.tableName} (id, role, name, position, state, email) VALUES (?,?,?,?,?,?)`,
            args: [
                employee.id.value,
                employee.role.value,
                employee.name.value,
                employee.position.value,
                employee.state.value,
                employee.email.value,
            ],
        })
    }

    async getAll(): Promise<Employee[]> {
        const query = {
            sql: `SELECT * FROM ${this.tableName}`,
        }

        const result = await this.db.execute(query)

        return result.rows.map((row) =>
            this.mapToDomain(row as unknown as EmployeeTurso)
        )
    }

    async findById(id: EmployeeId): Promise<Employee | null> {
        const query = {
            sql: `SELECT * FROM ${this.tableName} WHERE id = ?`,
            args: [id.value],
        }

        const result = await this.db.execute(query)

        return this.mapToDomain(result.rows[0] as unknown as EmployeeTurso)
    }

    async updateNotificatonToken(
        id: EmployeeId,
        token: EmployeeNotificationToken
    ): Promise<void> {
        const query = {
            sql: `UPDATE ${this.tableName} SET notification_token = ? WHERE id = ?`,
            args: [token.value, id.value],
        }
        await this.db.execute(query)
    }

    private mapToDomain(employee: EmployeeTurso) {
        return new Employee({
            id: new EmployeeId(employee.id),
            name: new EmployeeName(employee.name),
            notificationToken: new EmployeeNotificationToken(
                employee.notification_token
            ),
            role: new EmployeeRole(employee.role),
            position: new EmployeePosition(employee.position),
            state: new EmployeeState(employee.state),
            email: new EmployeeEmail(employee.email),
            docId: new EmployeeDocId(employee.doc_id),
        })
    }
}
