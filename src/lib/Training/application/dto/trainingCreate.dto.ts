export interface TrainingCreateDTO {
    id: string
    title: string
    description: string | null
    date: string
    statusId: string
    location: string
    slug: string
    createdAt: string
    startTime: string
    endTime: string
    banner: string
    capacity: number
    typeId: string
}
