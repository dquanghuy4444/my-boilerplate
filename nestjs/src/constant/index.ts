export enum Role {
    ADMIN = "admin",
    USER = "user",
    DRIVER = "driver",
}
export enum UserRole {
    ADMIN = "admin",
    USER = "user"
}

export enum ServiceProductType {
    MATTRESS = "mattress",
    BED_LINEN = "bed_linen",
}

export enum ServiceProductVariantType {
    MATTRESS = "mattress",
    BED_LINEN = "bed_linen",
}

export enum ServiceProductStatus {
    ACTIVE = "active",
    INACTIVE = "inactive",
    DELETED = "deleted",
}

export enum DriverVehicleType {
    CAR = "car",
    MOTORBIKE = "motorbike",
}

export enum DriverStatus {
    ACTIVE = "active",
    INACTIVE = "inactive",
    DELETED = "deleted",
    REJECTED = "rejected",
}

export enum Gender {
    FEMALE = "female",
    MALE = "male",
    OTHER = "other",
}

export enum CommonStatus {
    ACTIVE = "active",
    INACTIVE = "inactive",
    DELETED = "deleted",
}


export const COMMON_ERROR_MESSENGER = "Something Wrong"

export const ERROR_MESSENGER_LOST_ITEM = "Item Not Found"

export const ERROR_MESSENGER_PHONE_NUMBER_EXISTS = 'Phone Number Exists'
export const ERROR_MESSENGER_ID_CARD_NUMBER_EXISTS = 'ID Card Number Exists'

export const ERROR_MESSENGER_INVALID_PHONE_NUMBER = 'Invalid Phone Number'
export const ERROR_MESSENGER_INVALID_PASSWORD = 'Invalid Password'

export const ERROR_MESSENGER_PASSWORD_SAME = 'Password Same'

export const ERROR_MESSENGER_USER_NOT_FOUND = 'User Not Found'
export const ERROR_MESSENGER_DRIVER_NOT_FOUND = "Driver Not Found"
export const ERROR_MESSENGER_PRODUCT_COLOR_NOT_FOUND = "Product Color Not Found"
export const ERROR_MESSENGER_PRODUCT_COLOR_GROUP_NOT_FOUND = "Product Color Group Not Found"
export const ERROR_MESSENGER_PRODUCT_MATERIAL_NOT_FOUND = "Product Material Not Found"
export const ERROR_MESSENGER_PRODUCT_SIZE_NOT_FOUND = "Product Size Not Found"
export const ERROR_MESSENGER_PRODUCT_BRAND_NOT_FOUND = "Product Brand Not Found"
export const ERROR_MESSENGER_SERVICE_PRODUCT_NOT_FOUND = "Service Product Not Found"
export const ERROR_MESSENGER_USER_PRODUCT_TYPE_NOT_FOUND = "User Product Type Not Found"
export const ERROR_MESSENGER_LAUNDRY_SERVICE_NOT_FOUND = "Laundry Service Not Found"
export const ERROR_MESSENGER_LAUNDRY_PRODUCT_SERVICE_TYPE_NOT_FOUND = "Laundry Service Product Type Not Found"
