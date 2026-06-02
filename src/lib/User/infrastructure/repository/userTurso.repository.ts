import { UserRepository } from '@/lib/User/domain/repository/user.repository'
import { User } from '@/lib/User/domain/entity/user.entity'
import { UserId } from '@/lib/User/domain/value-objects/userId.vo'
import { UserFullName } from '@/lib/User/domain/value-objects/userFullName.vo'
import { UserDocId } from '@/lib/User/domain/value-objects/userDocId.vo'
import { UserEmail } from '@/lib/User/domain/value-objects/userEmail.vo'
import { UserPhone } from '@/lib/User/domain/value-objects/userPhone.vo'
import { UserBirthDate } from '@/lib/User/domain/value-objects/userBirthDate.vo'
import { UserOccupationStatus } from '@/lib/User/domain/value-objects/userOccupationStatus.vo'
import { UserUniversity } from '@/lib/User/domain/value-objects/userUniversity.vo'
import { UserHowFindUs } from '@/lib/User/domain/value-objects/userHowFindUs.vo'
import { UserDisability } from '@/lib/User/domain/value-objects/userDisability.vo'
import { UserIgUsername } from '@/lib/User/domain/value-objects/userIgUsername.vo'
import { TursoDatabase } from '@/lib/shared/insfrastructure/database/turso.db'
import { UserGender } from '@/lib/User/domain/value-objects/userGender.vo'
import { UserCountryOfResidence } from '../../domain/value-objects/userCountryOfResidence.vo'
import { UserTiktokUsername } from '../../domain/value-objects/userTiktokUsername.vo'
import { UserFirstName } from '../../domain/value-objects/userFirstName.vo'
import { UserSecondName } from '../../domain/value-objects/userSecondName.vo'
import { UserThirdName } from '../../domain/value-objects/userThirdName.vo'
import { UserLastName } from '../../domain/value-objects/userLastName.vo'
import { UserSecondLastName } from '../../domain/value-objects/userSecondLastName.vo'
import { UserNeedHelp } from '../../domain/value-objects/userNeedHelp.vo'

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
    gender: string
    country_of_residence: string
    tiktok_username: string
    first_name: string
    second_name: string
    third_name: string
    last_name: string
    second_last_name: string
    need_help: string
}

export class UserTursoRepository implements UserRepository {
    private db = TursoDatabase.getInstance().getClient()
    private tableName = 'user'

    async create(user: User): Promise<void> {
        const query = {
            sql: `INSERT INTO ${this.tableName}
                        (id, full_name, doc_id, email, phone, birthdate, occupation_status, university, how_find_us, disability, ig_username, gender, country_of_residence, tiktok_username, first_name, second_name, third_name, last_name, second_last_name, need_help)
                        VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
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
                user.gender.value,
                user.countryOfResidence.value,
                user.tiktokUsername.value,
                user.firstName.value,
                user.secondName.value,
                user.thirdName.value,
                user.lastName.value,
                user.secondLastName.value,
                user.needHelp.value,
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

        if (!row) return null

        return this.mapToDomain(row)
    }

    async findByPhone(phone: UserPhone): Promise<User | null> {
        const query = {
            sql: `SELECT * FROM ${this.tableName} WHERE phone = ?`,
            args: [phone.value],
        }

        const result = await this.db.execute(query)

        const row: UserTurso = result.rows[0] as unknown as UserTurso

        if (!row) return null

        return this.mapToDomain(row)
    }

    async findByDocId(docId: UserDocId): Promise<User | null> {
        const query = {
            sql: `SELECT * FROM ${this.tableName} WHERE doc_id = ?`,
            args: [docId.value],
        }

        const result = await this.db.execute(query)

        const row: UserTurso = result.rows[0] as unknown as UserTurso

        if (!row) return null

        return this.mapToDomain(row)
    }

    async findByEmail(email: UserEmail): Promise<User | null> {
        const query = {
            sql: `SELECT * FROM ${this.tableName} WHERE email = ?`,
            args: [email.value],
        }

        const result = await this.db.execute(query)

        const row: UserTurso = result.rows[0] as unknown as UserTurso

        if (!row) return null

        return this.mapToDomain(row)
    }

    async findByIgUsername(igUsername: UserIgUsername): Promise<User | null> {
        const query = {
            sql: `SELECT * FROM ${this.tableName} WHERE ig_username = ?`,
            args: [igUsername.value],
        }

        const result = await this.db.execute(query)

        const row: UserTurso = result.rows[0] as unknown as UserTurso

        if (!row) return null

        return this.mapToDomain(row)
    }

    async findByTiktokUsername(
        tiktokUsername: UserTiktokUsername
    ): Promise<User | null> {
        const query = {
            sql: `SELECT * FROM ${this.tableName} WHERE tiktok_username = ?`,
            args: [tiktokUsername.value],
        }

        const result = await this.db.execute(query)

        const row: UserTurso = result.rows[0] as unknown as UserTurso

        if (!row) return null

        return this.mapToDomain(row)
    }

    private mapToDomain(user: UserTurso): User {
        return new User({
            id: new UserId(user.id),
            fullName: new UserFullName(user.full_name),
            docId: new UserDocId(user.doc_id),
            email: new UserEmail(user.email),
            phone: new UserPhone(user.phone),
            birthDate: new UserBirthDate(user.birthdate),
            occupationStatus: new UserOccupationStatus(user.occupation_status),
            university: new UserUniversity(user.university),
            howFindUs: new UserHowFindUs(user.how_find_us),
            disability: new UserDisability(user.disability),
            igUsername: new UserIgUsername(user.ig_username),
            gender: new UserGender(user.gender),
            countryOfResidence: new UserCountryOfResidence(
                user.country_of_residence
            ),
            tiktokUsername: new UserTiktokUsername(user.tiktok_username),
            firstName: new UserFirstName(user.first_name),
            secondName: new UserSecondName(user.second_name),
            thirdName: new UserThirdName(user.third_name),
            lastName: new UserLastName(user.last_name),
            secondLastName: new UserSecondLastName(user.second_last_name),
            needHelp: new UserNeedHelp(user.need_help),
        })
    }
}
