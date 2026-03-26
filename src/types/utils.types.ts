export type DbResult<T> = [Error | null, T | null]
export type DbResultArray<T> = [Error | null, T[] | null]

export type DbResultVoid = [Error | null, null]

export type DbResultCount = [Error | null, number]

export interface DatabaseError extends Error {
    code?: string
    errno?: number
    sql?: string
    sqlMessage?: string
}

export function isDbSuccess<T>(result: DbResult<T>): result is [null, T] {
    return result[0] === null && result[1] !== null
}

export function isDbSuccessArray<T>(
    result: DbResultArray<T>
): result is [null, T[]] {
    return result[0] === null && result[1] !== null
}
