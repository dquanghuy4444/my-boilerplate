import { API_URL } from "configs/env"

interface IData<T> {
    data: T | null
    meta?: any
}

interface IResponse<T> {
    payload: IData<T>
    success: boolean
}

const formatResponse = async <T>(response: Response) => {
    const newRes: IResponse<T> = await response.json()

    if (newRes.success) {
        return newRes.payload
    }

    return {
        data: null
    }
}

export const fetchData = async <T>(path: string, qs: any = null): Promise<IData<T>> => {
    try {
        let queryString = ""
        if (qs) {
            const params = new URLSearchParams(qs)
            queryString = `?${params.toString()}`
        }
        const response = await fetch(`${API_URL}/${path}${queryString}`)

        return await formatResponse<T>(response)
    } catch (ex) {
        return {
            data: null
        }
    }
}

export const postData = async (path: string, data: any): Promise<boolean> => {
    try {
        await fetch(`${API_URL}/${path}`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })

        return true
    } catch (ex) {
        return false
    }
}
