import pg from 'pg';
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pg;

const databaseConfig = {
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
}

//const db = new Pool(databaseConfig);
const db = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'postgres1',
    database: 'linkr'
});

export default db;
