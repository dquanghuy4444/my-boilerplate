import { getAuth } from "firebase-admin/auth"

export const getPhoneNumberByToken = async (token: string): Promise<string | undefined> => {
    const decodedToken = await getAuth().verifyIdToken(token)

    const { phone_number } = decodedToken
    return phone_number
}
