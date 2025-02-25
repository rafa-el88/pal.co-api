import 'dotenv/config';
import sql from 'mssql';

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};

const getDbConnection = async () => {
    try {
        if (!process.env.DB_SERVER) {
            throw new Error('Database server configuration is missing');
        }
        const pool = await sql.connect(config);
        console.log('Database connected successfully');
        return pool;
    } catch (err) {
        console.error('Database connection failed:', err);
        throw err;
    }
};

export default {
    getDbConnection
};