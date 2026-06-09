export interface TrainingStatus {
    id: string
    status: string
}

export interface TrainingType {
    id: string
    type: string
    slug: string
}

export interface VisibilityType {
    id: string
    name: string
    description: string | null
}

export const TrainingStatusEnum = {
    DRAFT: 'draft',
    PUBLISHED: 'published',
    CANCELLED: 'cancelled',
    COMPLETED: 'completed',
} as const

export const TrainingTypeEnum = {
    PRESENTIAL: 'presential',
    VIRTUAL: 'virtual',
    HYBRID: 'hybrid',
} as const

export const VisibilityTypeEnum = {
    PUBLIC: 'vis_public',
    REGISTERED: 'vis_registered',
    PRIVATE: 'vis_private',
} as const

export type TrainingStatusValue =
    (typeof TrainingStatusEnum)[keyof typeof TrainingStatusEnum]
export type TrainingTypeValue =
    (typeof TrainingTypeEnum)[keyof typeof TrainingTypeEnum]
export type VisibilityTypeValue =
    (typeof VisibilityTypeEnum)[keyof typeof VisibilityTypeEnum]
