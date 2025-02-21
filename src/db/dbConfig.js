const sql = require('mssql');
const dotenv = require('dotenv');
dotenv.config();

const config = {
  server: process.env.DB_SERVER,
  database: 'pal.co',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: 1433,
  options: {
    encrypt: true,
    trustServerCertificate: true
  }
};

let pool;

async function getDbConnection() {
  if (!pool) {
    pool = await sql.connect(config);
  }
  return pool;
}

module.exports = {
  sql,
  getDbConnection
};