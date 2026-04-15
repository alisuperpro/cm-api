import { TrainingType } from '@/lib/Training/domain/entity/trainingType.entity'
import { TrainingTypeRepository } from '@/lib/Training/domain/repository/trainingType.repository'
import { TrainingTypeSlug } from '@/lib/Training/domain/value-objects/trainingType/trainingTypeSlug.vo'
import { TrainingTypeType } from '@/lib/Training/domain/value-objects/trainingType/trainingTypeType.vo'
import { TrainingTypeId } from '@/lib/Training/domain/value-objects/trainingTypeId.vo'
import { TrainingTypeCreateDTO } from '@/lib/Training/application/dto/trainingTypeCreate.dto'

export class TrainingTypeCreate {
    constructor(private repository: TrainingTypeRepository) {}

    async run(dto: TrainingTypeCreateDTO) {
        const type = new TrainingType(
            new TrainingTypeId(dto.id),
            new TrainingTypeType(dto.type),
            new TrainingTypeSlug(dto.slug)
        )

        return await this.repository.create(type)
    }
}
