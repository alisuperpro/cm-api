import { TrainingTypeSlug } from '@/lib/Training/domain/value-objects/trainingType/trainingTypeSlug.vo'
import { TrainingTypeType } from '@/lib/Training/domain/value-objects/trainingType/trainingTypeType.vo'
import { TrainingTypeId } from '@/lib/Training/domain/value-objects/trainingTypeId.vo'

export class TrainingType {
    constructor(
        public readonly id: TrainingTypeId,
        public readonly type?: TrainingTypeType,
        public readonly slug?: TrainingTypeSlug
    ) {}

    toPrimitives() {
        return {
            id: this.id.value,
            type: this.type?.value,
            slug: this.slug?.value,
        }
    }
}
