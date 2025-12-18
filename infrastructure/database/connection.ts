import { Pool, PoolConfig } from "pg";
import { readFileSync } from "fs";

const dbconfig: PoolConfig = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    ssl: {
        rejectUnauthorized: true,
        ca: readFileSync("./infrastructure/database/ca.pem").toString(),
    }
};

const db = new Pool(dbconfig as PoolConfig);

export default db;