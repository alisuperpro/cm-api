export class TrainingTypeSlug {
    public readonly value: string

    constructor(value: string) {
        this.value = TrainingTypeSlug.toSlug(value)
        this.validate(this.value)
    }

    private static toSlug(value: string): string {
        return value
            .trim()
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-+|-+$/g, '')
    }

    private validate(value: string) {
        if (!value) {
            throw new Error('Training type slug not valid')
        }

        if (value.length < 3) {
            throw new Error('Training type slug too short')
        }
    }
}
