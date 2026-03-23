import * as z from 'zod'

// Esquema base para Training
export const TrainingCreate = z.object({
    title: z.string().min(3, 'El título debe tener al menos 3 caracteres'),
    date: z.date({
        error: 'La fecha es requerida',
    }),
    statusId: z.string({
        error: 'El estado es requerido',
    }),
    location: z.string().min(1, 'La ubicación es requerida'),
    startTime: z
        .string()
        .regex(
            /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
            'Formato de hora inválido (HH:MM)'
        ),
    endTime: z
        .string()
        .regex(
            /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
            'Formato de hora inválido (HH:MM)'
        ),
    banner: z.string().nonoptional(),
    typeId: z
        .string({
            error: 'El tipo es requerido',
        })
        .nonempty(),
    capacity: z
        .number({
            error: 'La capacidad es requerida',
        })
        .int()
        .positive()
        .min(1, 'La capacidad debe ser mayor a 0'),
    slug: z
        .string()
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug inválido')
        .min(3),
})

// Esquema para actualización (todos los campos opcionales)
export const TrainingUpdate = TrainingCreate.partial()

// Esquema para validación de ID
export const TrainingId = z.object({
    id: z.string().nonempty(),
})

// Esquema para filtros/búsqueda
export const TrainingFilters = z.object({
    statusId: z.string().optional(),
    typeId: z.string().optional(),
    fromDate: z.date().optional(),
    toDate: z.date().optional(),
    search: z.string().optional(),
    limit: z.number().int().positive().max(100).default(10),
    offset: z.number().int().min(0).default(0),
})

// Tipo inferido para usar en TypeScript
export type TrainingCreateType = z.infer<typeof TrainingCreate>
export type TrainingUpdateType = z.infer<typeof TrainingUpdate>
export type TrainingIdType = z.infer<typeof TrainingId>
