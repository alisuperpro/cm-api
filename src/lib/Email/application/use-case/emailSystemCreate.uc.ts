import { EmailSystem } from '../../domain/entity/emailystem.entity'
import { EmailSystemRepository } from '../../domain/repository/emailSystem.repository'
import { EmailSystemActive } from '../../domain/value-objects/emailSystem/emailSystemActive.vo'
import { EmailSystemEmail } from '../../domain/value-objects/emailSystem/emailSystemEmail.vo'
import { EmailSystemHost } from '../../domain/value-objects/emailSystem/emailSystemHost.vo'
import { EmailSystemId } from '../../domain/value-objects/emailSystem/emailSystemId.vo'
import { EmailSystemName } from '../../domain/value-objects/emailSystem/emailSystemName.vo'
import { EmailSystemPassword } from '../../domain/value-objects/emailSystem/emailSystemPassword.vo'
import { EmailSystemPort } from '../../domain/value-objects/emailSystem/emailSystemPort.vo'
import { EmailSystemCreateDTO } from '../dto/emailSystemCreate.dto'

export class EmailSystemCreate {
    constructor(private repository: EmailSystemRepository) {}

    async run(emailSystem: EmailSystemCreateDTO) {
        const email = new EmailSystem({
            id: new EmailSystemId(emailSystem.id),
            email: new EmailSystemEmail(emailSystem.email),
            name: new EmailSystemName(emailSystem.name),
            password: new EmailSystemPassword(emailSystem.password),
            host: new EmailSystemHost(emailSystem.host),
            port: new EmailSystemPort(emailSystem.port),
            active: new EmailSystemActive(emailSystem.active),
        })

        return await this.repository.create(email)
    }
}
