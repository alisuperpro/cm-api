import { TrainingType } from '../../../domain/entity/trainingType.entity'
import { TrainingTypeRepository } from '../../../domain/repository/trainingType.repository'
import { TrainingTypeSlug } from '../../../domain/value-objects/trainingType/trainingTypeSlug.vo'
import { TrainingTypeType } from '../../../domain/value-objects/trainingType/trainingTypeType.vo'
import { TrainingTypeId } from '../../../domain/value-objects/trainingTypeId.vo'
import { TrainingTypeCreateDTO } from '../../dto/trainingTypeCreate.dto'

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
