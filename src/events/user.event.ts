import { appEventEmitter } from './eventEmitter'

export async function setupUserService() {
    appEventEmitter.on('userCreated', async (data: any) => {
        console.log(
            `[User Services] Agregar los permisos por defecto que tendra el nuevo cliente ${data.id}`
        )
    })

    console.log('[User Services] Escuchando eventos')
}
