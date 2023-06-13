import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
   user: process.env.DB_USERNAME,
   password: String(process.env.DB_PASSWORD),
   database: process.env.DB_NAME,
   host: process.env.BD_HOST,
   port: Number(process.env.DB_PORT)
})

console.log(process.env);


export default pool;