import { AppDataSource } from "./data-source"
import * as express from "express"
import * as dotenv from "dotenv"
import { Request, Response } from "express"
import "reflect-metadata"
import { User } from "./entity/User"
import { SimpleConsoleLogger } from "typeorm"

dotenv.config()
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.get("*", (req: Request, res: Response) => {
    res.status(505).json({ message: "Bad Request" })
})

AppDataSource.initialize().then(async () => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`)
    })
    console.log("Data source has been initialized")
}).catch(error => {
    console.log(error)
    process.exit(1)
})
