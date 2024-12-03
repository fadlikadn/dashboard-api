import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import * as dotenv from "dotenv"

dotenv.config()
const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE, NODE_ENV } = process.env

export const AppDataSource = new DataSource({
    type: "postgres",
    // host: "localhost",
    host: DB_HOST,
    port: parseInt(DB_PORT || "5432"),
    // username: "test",
    // password: "test",
    // database: "test",
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    // synchronize: true,
    synchronize: NODE_ENV === "dev" ? false : false,
    logging: false,
    entities: [User],
    migrations: [__dirname + "/migration/**/*.ts"],
    subscribers: [],
})
