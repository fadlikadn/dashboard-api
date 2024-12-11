import { AppDataSource } from "./data-source"
import express from "express"
import { Request, Response, Application } from "express"
import * as dotenv from "dotenv"
import "reflect-metadata"
import patientRouter from "./routes/PatientRoutes"
import WebSocket from "ws"
import { AuthService } from "./services/AuthService"
import { authMiddleware } from "./middlewares/auth.middleware"
import { checkPermission } from "./middlewares/rbac.middleware"

const morgan = require("morgan")
const swaggerUi = require("swagger-ui-express")
const cors = require("cors")
const http = require("http")

dotenv.config()
const app: Application = express()
const server = http.createServer(app)
const wss = new WebSocket.Server({ server })

const port = process.env.PORT || 3001

app.use(cors())

app.use(express.json())
app.use(morgan("tiny"))
app.use(express.static("public"))

const clients: Set<WebSocket> = new Set()
wss.on("connection", (ws: WebSocket) => {
    clients.add(ws)
    // console.log('clients', clients)
    // console.log('total clients', clients.size)
    ws.on('close', () => clients.delete(ws))
    ws.on('message', (message: string) => {
        // console.log(`Received message => ${message}`)
        ws.send(message)
        clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN && client !== ws) {
                client.send(message)
            }
        })
    })
})

app.post("/broadcast", (_req: Request, res: Response) => {
    const message = JSON.stringify({ type: "NEW_APPOINTMENT" })
    clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message)
        }
    })
    res.json({ message: "Broadcasted" })
})

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

const authService = new AuthService()
app.post('/login', async (req: Request, res: Response) => {
    const { username, password } = req.body
    const token = await authService.login(username, password)
    if (token) {
        res.json({ token})
    } else {
        res.status(401).json({ message: "Invalid credentials" })
    }
})

app.post('/register', async (req: Request, res: Response) => {
    const { username, name, email, password, role } = req.body
    try {
        const user = await authService.register(username, name, email, password, role)
        if (user) {
            res.status(201).json({ message: "User created", user: user })
        } else {
            res.status(400).json({ message: "User already exists" })
        }
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

app.get("/profile", authMiddleware, checkPermission(["DOCTOR"]), async (_req: Request, res: Response) => {
    res.json({ message: "Welcome" })
})

AppDataSource.initialize().then(async () => {
    server.listen(port, () => {
        console.log(`Server is running on port ${port}`)
    })
    console.log("Data source has been initialized")
}).catch(error => {
    console.log(error)
    process.exit(1)
})
