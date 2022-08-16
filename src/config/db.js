import pg from 'pg';
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pg;

//process.env.DATABASE_URL

const databaseConfig = {
    connectionString: `postgres://usrgatzhrqowbr:b3c13f7d34566a972d9ef77205f203ab56aac43f4db53fbba77064030c17bc1b@ec2-54-85-56-210.compute-1.amazonaws.com:5432/dep8ohlqan5m68`,
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
