import { TursoDatabase } from '@/lib/shared/insfrastructure/database/turso.db'
import { generateUUID } from '@/lib/shared/insfrastructure/utils/generateUUID'
import { TrainingTypeRepository } from '@/lib/Training/domain/repository/trainingType.repository'
import { TrainingType } from '@/lib/Training/domain/entity/trainingType.entity'
import { TrainingTypeId } from '@/lib/Training/domain/value-objects/trainingTypeId.vo'
import { TrainingTypeType } from '@/lib/Training/domain/value-objects/trainingType/trainingTypeType.vo'
import { TrainingTypeSlug } from '@/lib/Training/domain/value-objects/trainingType/trainingTypeSlug.vo'

type TrainingTypeTurso = {
    id: string
    type: string
    slug: string
}

export class TrainingTypeTursoRepository implements TrainingTypeRepository {
    private db = TursoDatabase.getInstance().getClient()
    private tableName = 'training_type'

    async create(type: TrainingType): Promise<void> {
        const id = generateUUID()
        const query = {
            sql: `INSERT INTO ${this.tableName} (id, type, slug) VALUES (?,?,?)`,
            args: [id, type.type?.value ?? '', type.slug?.value ?? ''],
        }

        await this.db.execute(query)
    }

    async getAll(): Promise<TrainingType[]> {
        const query = {
            sql: `SELECT * FROM ${this.tableName}`,
        }

        const result = await this.db.execute(query)

        return result.rows.map((row) =>
            this.mapToDomain(row as unknown as TrainingTypeTurso)
        )
    }

    private mapToDomain(row: TrainingTypeTurso): TrainingType {
        return new TrainingType(
            new TrainingTypeId(row.id),
            new TrainingTypeType(row.type),
            new TrainingTypeSlug(row.slug)
        )
    }
}
