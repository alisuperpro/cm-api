import { TrainingStatus, TrainingType } from './enums.types'
import { UserType } from './user.types'

export interface Training {
    id: string
    title: string
    description: string
    date: string
    status_id: string
    location: string
    slug: string
    created_at: string
    start_time: string
    end_time: string
    banner: string
    capacity: number
    type_id: string
}

export interface TrainingWithRelations extends Training {
    status?: TrainingStatus
    type?: TrainingType
    participants?: TrainingUser[]
    availableSpots?: number
}

export interface TrainingUser {
    id: string
    training_id: string
    user_id: string
    how_find: string
    experience: string
    additional_info: string
    pay_ref: string
    pay_img: string
    is_arrived: boolean
    certificate_received: boolean
    created_at: string
}

export interface TrainingUserWithRelations extends TrainingUser {
    training?: Training
    user?: UserType
}

export type CreateTrainingDTO = Omit<Training, 'id' | 'created_at' | 'slug'> & {
    slug?: string
}
export type UpdateTrainingDTO = Partial<CreateTrainingDTO>
export type CreateTrainingUserDTO = Omit<TrainingUser, 'id' | 'created_at'>
export type UpdateTrainingUserDTO = Partial<CreateTrainingUserDTO>
