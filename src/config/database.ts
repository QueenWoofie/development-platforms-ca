import mysql from "mysql2/promise";
import { dbConfig } from "./env.js";

export const pool = mysql.createPool(dbConfig);

export async function testConnection() {
    const conn = await pool.getConnection();
    try {
        await conn.ping();
    } finally {
        conn.release();
    }
}