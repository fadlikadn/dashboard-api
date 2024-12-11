import "reflect-metadata"
import { DataSource } from "typeorm"
import dotenv from "dotenv"
import path from "path"

dotenv.config()
const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE, NODE_ENV } = process.env

const entitiesPath = path.resolve(__dirname, "entity/**/*.ts")
const migrationsPath = path.resolve(__dirname, "migration/**/*.ts")

export const AppDataSource = new DataSource({
    type: "postgres",
    host: DB_HOST,
    port: parseInt(DB_PORT || "5432"),
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    synchronize: true,
    logging: false,
    migrations: [migrationsPath],
    entities: [entitiesPath],
    subscribers: [],
})

AppDataSource.initialize()
    .then(() => console.log("Database connected"))
    .catch((error) => console.error("Error connecting to database", error))