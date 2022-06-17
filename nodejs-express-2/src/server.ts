import express from "express"
import cors from "cors"
import helmet from "helmet"
import { PORT } from "config"
import cookieParser from "cookie-parser"

const app = express()

app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// Use cookie
app.use(cookieParser())

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT} 123`)
})
