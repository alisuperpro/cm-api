import { EmailSystem } from '../entity/emailystem.entity'

export interface EmailSystemRepository {
    create(emailSystem: EmailSystem): Promise<void>
}
