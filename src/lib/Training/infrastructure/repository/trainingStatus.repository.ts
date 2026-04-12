import { TursoDatabase } from '../../../shared/insfrastructure/database/turso.db'
import { generateUUID } from '../../../shared/insfrastructure/utils/generateUUID'
import { TrainingStatus } from '../../domain/entity/trainingStatus.entity'
import { TrainingStatusStatus } from '../../domain/value-objects/trainingStatus/trainingStatusStatus.vo'
import { TrainingStatusRepository } from '../../domain/repository/trainingStatus.repository'
import { TrainingStatusId } from '../../domain/value-objects/trainingStatusId.vo'

type TrainingStatusTurso = {
    id: string
    status: string
}

export class TrainingStatusTursoRepository implements TrainingStatusRepository {
    private db = TursoDatabase.getInstance().getClient()
    private tableName = 'training_status'

    async create(trainingStatus: TrainingStatus): Promise<void> {
        const id = generateUUID()
        const query = {
            sql: `INSERT INTO ${this.tableName} (id, status) VALUES (?,?)`,
            args: [id, trainingStatus.status?.value ?? ''],
        }

        await this.db.execute(query)
    }

    async getAll(): Promise<TrainingStatus[]> {
        const query = {
            sql: `SELECT * FROM ${this.tableName}`,
        }

        const result = await this.db.execute(query)

        return result.rows.map((row) =>
            this.mapToDomain(row as unknown as TrainingStatusTurso)
        )
    }

    private mapToDomain(row: TrainingStatusTurso): TrainingStatus {
        return new TrainingStatus(
            new TrainingStatusId(row.id),
            new TrainingStatusStatus(row.status)
        )
    }
}
