import { UserRepository } from '@/User/domain/repository/user.repository'
import { User } from '@/User/domain/entity/user.entity'
import { UserId } from '@/User/domain/value-objects/userId.vo'
import { UserFullName } from '@/User/domain/value-objects/userFullName.vo'
import { UserDocId } from '@/User/domain/value-objects/userDocId.vo'
import { UserEmail } from '@/User/domain/value-objects/userEmail.vo'
import { UserPhone } from '@/User/domain/value-objects/userPhone.vo'
import { UserBirthDate } from '@/User/domain/value-objects/userBirthDate.vo'
import { UserOccupationStatus } from '@/User/domain/value-objects/userOccupationStatus.vo'
import { UserUniversity } from '@/User/domain/value-objects/userUniversity.vo'
import { UserHowFindUs } from '@/User/domain/value-objects/userHowFindUs.vo'
import { UserDisability } from '@/User/domain/value-objects/userDisability.vo'
import { UserIgUsername } from '@/User/domain/value-objects/userIgUsername.vo'
import { TursoDatabase } from '@/User/../shared/insfrastructure/database/turso.db'

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
