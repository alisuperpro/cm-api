import { AdminUserCreate } from '@/lib/AdminUser/application/use-case/adminUserCreate.uc'
import { AdminUserFindById } from '@/lib/AdminUser/application/use-case/adminUserFindById.uc'
import { AdminUserGetAll } from '@/lib/AdminUser/application/use-case/adminUserGetAll.uc'
import { AdminUserUpdateNotoficationToken } from '@/lib/AdminUser/application/use-case/adminUserUpdateNotificationToken.uc'
import { AdminUserTursoRepository } from '@/lib/AdminUser/infrastructure/repository/adminUserTurso.repository'

const adminUserRepository = new AdminUserTursoRepository()

export const adminUserServices = {
    create: new AdminUserCreate(adminUserRepository),
    getAll: new AdminUserGetAll(adminUserRepository),
    findById: new AdminUserFindById(adminUserRepository),
    updateNotificationToken: new AdminUserUpdateNotoficationToken(
        adminUserRepository
    ),
}
