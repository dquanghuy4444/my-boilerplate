const digits: string[] = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z"
]

const MY_BIRTHDAY = new Date("1998-05-20T08:00").getTime()

const randomCharacters = (length: number) => {
    let result = ""
    const digitsLength = digits.length
    for (let i = 0; i < length; i++) {
        result += digits[Math.floor(Math.random() * digitsLength)]
    }
    return result
}
const genTimestamp = (i: number, length: number) => {
    const buf: string[] = []
    let charPos: number = length - 1
    const MAX_RADIX = digits.length
    while (i >= MAX_RADIX && charPos > 0) {
        buf[charPos--] = digits[Math.floor(i % MAX_RADIX)]
        i = i / MAX_RADIX
    }
    buf[charPos] = digits[Math.floor(i % MAX_RADIX)]
    for (let j = 0; j < charPos; j++) {
        buf[j] = "0"
    }
    return buf.join("")
}

const genUUID = (key = "UUID") => {
    const timestamps = genTimestamp(new Date().getTime() - MY_BIRTHDAY, 7)
    return timestamps + randomCharacters(5) + key
}

export default genUUID
