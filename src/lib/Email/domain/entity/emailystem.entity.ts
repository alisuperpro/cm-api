import { EmailSystemActive } from '../value-objects/emailSystem/emailSystemActive.vo'
import { EmailSystemEmail } from '../value-objects/emailSystem/emailSystemEmail.vo'
import { EmailSystemHost } from '../value-objects/emailSystem/emailSystemHost.vo'
import { EmailSystemId } from '../value-objects/emailSystem/emailSystemId.vo'
import { EmailSystemName } from '../value-objects/emailSystem/emailSystemName.vo'
import { EmailSystemPassword } from '../value-objects/emailSystem/emailSystemPassword.vo'
import { EmailSystemPort } from '../value-objects/emailSystem/emailSystemPort.vo'

interface IEmailSystem {
    id: EmailSystemId
    email: EmailSystemEmail
    name: EmailSystemName
    password: EmailSystemPassword
    host: EmailSystemHost
    port: EmailSystemPort
    active: EmailSystemActive
}

export class EmailSystem {
    public readonly id: EmailSystemId
    public readonly email: EmailSystemEmail
    public readonly name: EmailSystemName
    public readonly password: EmailSystemPassword
    public readonly host: EmailSystemHost
    public readonly port: EmailSystemPort
    public readonly active: EmailSystemActive
    constructor(email: IEmailSystem) {
        this.id = email.id
        this.email = email.email
        this.name = email.name
        this.password = email.password
        this.host = email.host
        this.port = email.port
        this.active = email.active
    }
}
