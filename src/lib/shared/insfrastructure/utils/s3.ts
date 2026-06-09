import {
    S3Client,
    PutObjectCommand,
    ListObjectsCommand,
    GetObjectCommand,
    DeleteObjectCommand,
} from '@aws-sdk/client-s3'
import fs from 'fs'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

export const AWS = {
    BUCKET_NAME: process.env.AWS_BUCKET_NAME ?? '',
    BUCKET_REGION: process.env.AWS_BUCKET_REGION ?? '',
    IAM_PUBLIC_KEY: process.env.AWS_IAM_PUBLIC_KEY ?? '',
    IAM_SECRET_KEY: process.env.AWS_IAM_SECRET_KEY ?? '',
}

const client = new S3Client({
    region: AWS.BUCKET_REGION,
    credentials: {
        accessKeyId: AWS.IAM_PUBLIC_KEY,
        secretAccessKey: AWS.IAM_SECRET_KEY,
    },
})

// upload.service.ts
export async function uploadFile(file: any, folder?: string) {
    const stream = fs.createReadStream(file.tempFilePath)

    // Generar ruta única
    const key = generateS3Key(file.name, folder)

    // Subir a S3
    const command = new PutObjectCommand({
        Bucket: AWS.BUCKET_NAME,
        Key: key,
        Body: stream,
        Metadata: {
            originalName: file.name,
            uploadDate: new Date().toISOString(),
        },
    })

    await client.send(command)

    // Limpiar archivo temporal
    fs.unlink(file.tempFilePath, (err) => {
        if (err) console.error('Error deleting temp file:', err)
    })

    return { key }
}

// Generar key único para S3
function generateS3Key(originalName: string, folder?: string): string {
    // Generar nombre único
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 15)
    const cleanName = originalName.replace(/[^a-zA-Z0-9.-]/g, '-').toLowerCase()

    const fileName = `${timestamp}-${randomString}-${cleanName}`

    // Construir key
    let key = `${fileName}`

    if (folder) {
        key = `${folder}/${key}`
    }

    return key
}

export async function getFiles() {
    const command = new ListObjectsCommand({
        Bucket: AWS.BUCKET_NAME,
    })

    const result = await client.send(command)

    return result
}

export async function getPresignedUrl({
    filename,
    expiresIn = 60 * 5,
}: {
    filename: string
    expiresIn: number
}) {
    const command = new GetObjectCommand({
        Bucket: AWS.BUCKET_NAME,
        Key: filename,
    })

    const url = await getSignedUrl(client, command, { expiresIn })
    return url
}

export async function deleteFile(filename: string) {
    const command = new DeleteObjectCommand({
        Bucket: AWS.BUCKET_NAME,
        Key: filename,
    })

    const result = await client.send(command)

    return result
}
