export const AWS_S3_CONFIGS = {
    REGION: process.env.NEXT_PUBLIC_AWS_S3_REGION,
    ACCESS_KEY_ID: process.env.NEXT_PUBLIC_AWS_S3_ACCESS_KEY_ID,
    SECRET_ACCESS_KEY: process.env.NEXT_PUBLIC_AWS_S3_SECRET_ACCESS_KEY,
    BUCKET_NAME: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME
}

export const ROOT_CLOUD_STORAGE_USER_UPLOAD_IMAGE = "users/uploads"
export const ROOT_CLOUD_STORAGE_STARMAP = "users/previews/starmaps"
export const ROOT_CLOUD_CUSTOMER_REVIEW = "users/reviews"
