import { AppDataSource } from "./data-source"
import * as express from "express"
import { Request, Response, Application } from "express"
import * as dotenv from "dotenv"
import "reflect-metadata"
import patientRouter from "./routes/PatientRoutes"
import morgan = require("morgan")
// import swaggerUi from "swagger-ui-express"

const swaggerUi = require("swagger-ui-express")

dotenv.config()
const app: Application = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(morgan("tiny"))
app.use(express.static("public"))

app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(undefined, {
        swaggerOptions: {
            url: "/swagger.json"
        }
    })
)

app.use("/patients", patientRouter)
// app.use(patientRouter)

// app.get("/patients", function (req: Request, res: Response) {
//     console.log("GET Patients")
//     res.json({
//         message: "GET Patients"
//     })
// })

// app.get("*", (req: Request, res: Response) => {
//     res.status(505).json({ message: "Bad Request" })
// })

AppDataSource.initialize().then(async () => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`)
    })
    console.log("Data source has been initialized")
}).catch(error => {
    console.log(error)
    process.exit(1)
})

// app.listen(port)
