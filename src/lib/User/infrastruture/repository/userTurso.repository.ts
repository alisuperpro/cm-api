import { UserRepository } from '../../domain/repository/user.repository'
import { User } from '../../domain/entity/user.entity'
import { UserId } from '../../domain/value-objects/userId.vo'
import { UserFullName } from '../../domain/value-objects/userFullName.vo'
import { UserDocId } from '../../domain/value-objects/userDocId.vo'
import { UserEmail } from '../../domain/value-objects/userEmail.vo'
import { UserPhone } from '../../domain/value-objects/userPhone.vo'
import { UserBirthDate } from '../../domain/value-objects/userBirthDate.vo'
import { UserOccupationStatus } from '../../domain/value-objects/userOccupationStatus.vo'
import { UserUniversity } from '../../domain/value-objects/userUniversity.vo'
import { UserHowFindUs } from '../../domain/value-objects/userHowFindUs.vo'
import { UserDisability } from '../../domain/value-objects/userDisability.vo'
import { UserIgUsername } from '../../domain/value-objects/userIgUsername.vo'
import { TursoDatabase } from '../../../shared/insfrastructure/database/turso.db'

type UserTurso = {
    id: string
    full_name: string
    doc_id: string
    email: string
    phone: string
    birthdate: string
    occupation_status: string
    university: string
    how_find_us: string
    disability: string
    ig_username: string
}

export class UserTursoRepository implements UserRepository {
    private db = TursoDatabase.getInstance().getClient()
    private tableName = 'user'

    async create(user: User): Promise<void> {
        const query = {
            sql: `INSERT INTO ${this.tableName}
                        (id, full_name, doc_id, email, phone, birthdate, occupation_status, university, how_find_us, disability, ig_username)
                        VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
            args: [
                user.id.value,
                user.fullName.value,
                user.docId.value,
                user.email.value,
                user.phone.value,
                user.birthDate.value,
                user.occupationStatus.value,
                user.university.value,
                user.howFindUs.value,
                user.disability.value,
                user.igUsername.value,
            ],
        }
        await this.db.execute(query)
    }
    async getAll(): Promise<User[]> {
        const query = {
            sql: `SELECT * FROM ${this.tableName}`,
        }

        const result = await this.db.execute(query)
        return result.rows.map((row) =>
            this.mapToDomain(row as unknown as UserTurso)
        )
    }
    async findById(id: UserId): Promise<User | null> {
        const query = {
            sql: `SELECT * FROM ${this.tableName} WHERE id = ?`,
            args: [id.value],
        }

        const result = await this.db.execute(query)

        const row: UserTurso = result.rows[0] as unknown as UserTurso

        return this.mapToDomain(row)
    }

    private mapToDomain(user: UserTurso): User {
        return new User(
            new UserId(user.id),
            new UserFullName(user.full_name),
            new UserDocId(user.doc_id),
            new UserEmail(user.email),
            new UserPhone(user.phone),
            new UserBirthDate(user.birthdate),
            new UserOccupationStatus(user.occupation_status),
            new UserUniversity(user.university),
            new UserHowFindUs(user.how_find_us),
            new UserDisability(user.disability),
            new UserIgUsername(user.ig_username)
        )
    }
}
