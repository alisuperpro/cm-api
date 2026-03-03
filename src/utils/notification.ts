export const sendPushNotification = async ({
    to,
    title,
    body,
}: {
    to: string
    title: string
    body: string
}) => {
    const url = 'https://exp.host/--/api/v2/push/send'

    const payload = {
        to,
        title,
        body,
    }

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })

        const data = await response.json()

        return [undefined, data]
    } catch (error) {
        console.error('Error al enviar la notificación:', error)
        return [error]
    }
}
