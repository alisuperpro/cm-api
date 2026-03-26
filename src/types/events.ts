// types/events.types.ts
import { UserType } from './user.types'
import { Training, TrainingUser } from './training.types'

export interface EventMap {
    // Eventos de entrenamiento
    payConfirmed: {
        id: string
        trainingId: string
    }
    userRemoveForTraining: {
        id: string
        trainingId: string
        reason: string
    }
    userRegisteredOnTraining: {
        trainingId: string
        userId: string
        registrationData?: Partial<TrainingUser>
    }
    userArrivedToTraining: {
        trainingId: string
        userId: string
    }
    certificateGenerated: {
        trainingId: string
        userId: string
        certificateUrl: string
    }

    // Eventos de video
    videoViewed: {
        videoId: string
        userId: string
        watchDuration: number
        completed: boolean
    }
    videoLiked: {
        videoId: string
        userId: string
        liked: boolean
    }
    videoCommented: {
        videoId: string
        userId: string
        commentId: string
        comment: string
    }

    // Eventos de notificación
    adminNotificationFailed: {
        adminId: string
        trainingId?: string
        videoId?: string
        error: string
    }
    pushNotificationSent: {
        userId: string
        type: string
        success: boolean
    }

    // Eventos de usuario
    userCreated: {
        userId: string
        userData: UserType
    }
    userUpdated: {
        userId: string
        changes: Partial<UserType>
    }
}

export type EventName = keyof EventMap
