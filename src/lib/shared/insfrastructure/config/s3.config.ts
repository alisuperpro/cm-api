import dotenv from 'dotenv'
dotenv.config({
    quiet: true,
})

export const s3Config = {
    region: process.env.AWS_BUCKET_REGION || 'us-east-1',
    bucket: process.env.AWS_BUCKET_NAME || 'my-blog-images',
    accessKeyId: process.env.AWS_IAM_PUBLIC_KEY,
    secretAccessKey: process.env.AWS_IAM_SECRET_KEY,
    endpoint: process.env.AWS_S3_ENDPOINT,
    publicUrl:
        process.env.AWS_S3_PUBLIC_URL ||
        `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_BUCKET_REGION}.amazonaws.com`,
}

// Validar configuración
if (!s3Config.accessKeyId || !s3Config.secretAccessKey) {
    console.warn(
        '⚠️ AWS credentials no configuradas. Las subidas de archivos no funcionarán.'
    )
}
