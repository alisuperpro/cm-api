export interface UserType {
    id: string
    full_name: string
    doc_id: string
    email: string
    phone: string
    birthday: string // Considera usar Date si lo parseas
    occupation_status: string
    university: string
    how_find_us: string
    disability: string
    ig_username: string
}

export type CreateUserDTO = Omit<UserType, 'id'>
export type UpdateUserDTO = Partial<CreateUserDTO>
