import { EmailSystemCreate } from '@/lib/Email/application/use-case/emailSystemCreate.uc'
import { EmailSystemFindById } from '@/lib/Email/application/use-case/emailSystemFindById.uc'
import { EmailSystemGetAll } from '@/lib/Email/application/use-case/emailSystemGetAll.uc'
import { EmailSystemTursoRepository } from '@/lib/Email/infrastructure/repository/emailSystem.repository'

const emailSystemRepository = new EmailSystemTursoRepository()

export const emailSystemServices = {
    create: new EmailSystemCreate(emailSystemRepository),
    getAll: new EmailSystemGetAll(emailSystemRepository),
    findById: new EmailSystemFindById(emailSystemRepository),
}
