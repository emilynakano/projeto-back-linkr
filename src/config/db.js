import pg from 'pg';
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pg;

//process.env.DATABASE_URL

const databaseConfig = {
    connectionString: `postgres://postgres:Siga123@@localhost:5432/linkr`,
    ssl: {
        rejectUnauthorized: false
    }
}
const db = new Pool(databaseConfig);

export default db;
