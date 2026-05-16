export function formatDate(fechaStr: string) {
    if (typeof fechaStr === 'string' && fechaStr.includes('/')) {
        const [day, month, year] = fechaStr.split('/')
        fechaStr = `${year}-${month}-${day}`
    }

    const fecha = new Date(fechaStr)

    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC',
    }

    //@ts-ignore
    return fecha.toLocaleDateString('es-ES', options)
}
