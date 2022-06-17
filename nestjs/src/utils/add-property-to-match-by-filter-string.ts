export function addPropertyToMatchByFilterString(str: string | undefined, cb: (arr: string[]) => void): void {
    if (!str) {
        return
    }
    const arr = str.split(",")
    if (arr.length > 0) {
        cb(arr)
    }
}
