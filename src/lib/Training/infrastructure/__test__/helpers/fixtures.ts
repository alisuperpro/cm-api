export const TRAINING_ROW = {
    id: '123e4567-e89b-12d3-a456-426614174000',
    title: 'Test Training',
    description: 'Una descripción válida',
    date: '01/06/2027',
    status_id: '123e4567-e89b-12d3-a456-426614174010',
    status_name: 'active',
    location: 'Bogotá',
    slug: 'test-training',
    created_at: '2025-01-01T00:00:00.000Z',
    start_time: '09:00',
    end_time: '11:00',
    banner: 'https://cdn.example.com/banner.jpg',
    capacity: 30,
    type_id: '123e4567-e89b-12d3-a456-426614174011',
    type_type: 'workshop',
    type_slug: 'workshop',
} as const

export const STATUS_ROW = {
    id: '123e4567-e89b-12d3-a456-426614174010',
    status: 'active',
} as const

export const TYPE_ROW = {
    id: '123e4567-e89b-12d3-a456-426614174011',
    type: 'workshop',
    slug: 'workshop',
} as const

// Second UUID for tests that need multiple rows
export const SECONDARY_UUID = '223e4567-e89b-12d3-a456-426614174099'

export const TRAINING_PRIMITIVES = {
    id: TRAINING_ROW.id,
    title: TRAINING_ROW.title,
    slug: TRAINING_ROW.slug,
}

export const STATUS_PRIMITIVES = {
    id: STATUS_ROW.id,
    name: STATUS_ROW.status,
}

export const TYPE_PRIMITIVES = {
    id: TYPE_ROW.id,
    name: TYPE_ROW.type,
    slug: TYPE_ROW.slug,
}
