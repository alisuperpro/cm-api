export interface AdminUserType {
    id: string
    notification_token: string
    role: 'admin' | 'super_admin' | string
    name: string
}

export type CreateAdminDTO = Omit<AdminUserType, 'id'>
export type UpdateAdminDTO = Partial<CreateAdminDTO>

export interface AdminNotificationPayload {
    adminId: string
    title: string
    body: string
    data?: Record<string, any>
}
