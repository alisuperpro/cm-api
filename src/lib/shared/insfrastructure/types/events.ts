import { UserType } from './user.types'
import { TrainingUser } from './training.types'

export interface EventMap {
    // Eventos de entrenamiento
    payConfirmed: {
        userId: string
        trainingId: string
        configId: string
    }
    userRemoveForTraining: {
        id: string
        trainingId: string
        reason: string
        configId: string
    }
    userRegisteredOnTraining: {
        trainingId: string
        userId: string
        registrationData?: Partial<TrainingUser>
        configId: string
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

    userContact: {
        name: string
        email: string
        service: string
        description: string
        configId: string
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
