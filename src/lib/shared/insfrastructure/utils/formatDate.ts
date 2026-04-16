export function formatDate(fechaStr: string) {
    const fecha = new Date(fechaStr)

    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }

    // @ts-ignore
    return fecha.toLocaleDateString('es-ES', options)
}
