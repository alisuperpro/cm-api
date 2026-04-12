export interface EnrollmentDetailDTO {
    id: string
    howFind: string
    experience: string
    additionalInfo: string | null
    payRef: string
    payImg: string
    isArrived: boolean
    certificateReceived: boolean
    createdAt: string

    user: {
        id: string
        full_name: string
        email: string
        doc_id: string
        phone: string
        birthdate: string
        occupation_status: string
        university: string
        how_find_us: string
        disability: string
        ig_username: string
    }

    training: {
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
}
