import { TrainingTypeSlug } from '../value-objects/trainingType/trainingTypeSlug.vo'
import { TrainingTypeType } from '../value-objects/trainingType/trainingTypeType.vo'
import { TrainingTypeId } from '../value-objects/trainingTypeId.vo'

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
