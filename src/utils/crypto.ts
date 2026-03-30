import crypto from 'crypto'
import dotenv from 'dotenv'
dotenv.config({
    quiet: true,
})

const ALGORITHM = 'aes-256-cbc'
const KEY = process.env.ENCRYPTION_KEY! // 32 caracteres
const IV_LENGTH = 16 // Para AES, el IV siempre es 16

export const encrypt = (text: string) => {
    const iv = crypto.randomBytes(IV_LENGTH)
    const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(KEY), iv)
    let encrypted = cipher.update(text)
    encrypted = Buffer.concat([encrypted, cipher.final()])
    // Guardamos el IV junto con el texto cifrado porque lo necesitaremos para descifrar
    return iv.toString('hex') + ':' + encrypted.toString('hex')
}

export const decrypt = (text: string) => {
    const textParts = text.split(':')
    const iv = Buffer.from(textParts.shift()!, 'hex')
    const encryptedText = Buffer.from(textParts.join(':'), 'hex')
    const decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(KEY), iv)
    let decrypted = decipher.update(encryptedText)
    decrypted = Buffer.concat([decrypted, decipher.final()])
    return decrypted.toString()
}
