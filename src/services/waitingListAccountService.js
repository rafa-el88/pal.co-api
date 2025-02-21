const sql = require('mssql');
const dbConfig = require('../db/dbConfig');

const addAccountToWaitingList = async (name, ddd, phone, email) => {
  try {
    const pool = await dbConfig.getDbConnection();

    // Check for duplicate Phone
    let phoneCheckQuery = `SELECT NOME FROM TB_LISTA_ESPERA_CONTA WHERE DDD = @ddd AND TELEFONE = @phone`;
    let phoneCheckResult = await pool.request()
      .input('DDD', sql.NVarChar, ddd)
      .input('TELEFONE', sql.NVarChar, phone)
      .query(phoneCheckQuery);

    if (phoneCheckResult.recordset.length > 0) {
      return { duplicate: true, field: 'Telefone', name: phoneCheckResult.recordset[0].name };
    }

    // Check for duplicate Email
    let emailCheckQuery = `SELECT name FROM TB_LISTA_ESPERA_CONTA WHERE email = @email`;
    let emailCheckResult = await pool.request()
      .input('email', sql.NVarChar, email)
      .query(emailCheckQuery);

    if (emailCheckResult.recordset.length > 0) {
      return { duplicate: true, field: 'Email', name: emailCheckResult.recordset[0].name };
    }

    let dateCreate = new Date();

    let query = `INSERT INTO TB_LISTA_ESPERA_CONTA (NOME, DDD, TELEFONE, EMAIL, dateCreate) 
                 VALUES (@name, @ddd, @phone, @email, @dateCreate)`;

    let result = await pool.request()
      .input('name', sql.NVarChar, name)
      .input('ddd', sql.NVarChar, ddd)
      .input('phone', sql.NVarChar, phone)
      .input('email', sql.NVarChar, email)
      .input('dateCreate', sql.DateTime, dateCreate)
      .query(query);

    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports = {
  addAccountToWaitingList
};
