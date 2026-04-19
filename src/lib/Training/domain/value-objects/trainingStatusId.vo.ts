import { Uuid } from '@/lib/shared/domain/value-objects/uuid.vo'

export class TrainingStatusId extends Uuid {
    constructor(value: string) {
        super(value)
    }
}
