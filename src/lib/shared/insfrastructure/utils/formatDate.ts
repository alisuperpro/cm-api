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

export function formatHours(hrs: string) {
    const hour24 = hrs

    const [hour, minut] = hour24.split(':')
    const FakeDate = new Date()
    FakeDate.setHours(Number(hour), Number(minut), 0)

    const hour12 = FakeDate.toLocaleTimeString('es-ES', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    })

    return hour12
}
