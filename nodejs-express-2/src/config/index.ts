require("dotenv").config()
const PORT = process.env.PORT || 3000

const POSTGRES = {
    DATABASE: process.env.POSTGRES_DATABASE || "",
    USERNAME: process.env.POSTGRES_USERNAME || "",
    PASSWORD: process.env.POSTGRES_PASSWORD || ""
}

export { PORT, POSTGRES }
