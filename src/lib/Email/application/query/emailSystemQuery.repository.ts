import { EmailSystemDetailsDTO } from '../dto/emailSystemDetails.dto'

export interface EmailSystemQueryRepository {
    getAll(): Promise<EmailSystemDetailsDTO[]>
    findById(id: string): Promise<EmailSystemDetailsDTO | null>
}
