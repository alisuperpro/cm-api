import dotenv from 'dotenv'
dotenv.config({
    quiet: true,
})

export const UPLOAD_FIELDS = {
    PAYS: 'pay-img',
    THUMBNAIL: 'thumbnail',
    VIDEO: 'video',
} as const

export const AWS = {
    BUCKET_NAME: process.env.AWS_BUCKET_NAME ?? '',
    BUCKET_REGION: process.env.AWS_BUCKET_REGION ?? '',
    IAM_PUBLIC_KEY: process.env.AWS_IAM_PUBLIC_KEY ?? '',
    IAM_SECRET_KEY: process.env.AWS_IAM_SECRET_KEY ?? '',
}
