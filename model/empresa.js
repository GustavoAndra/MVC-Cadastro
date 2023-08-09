const db = require('./db');

module.exports.checkEmailExists = async (email) => {
    const connection = await db.connect();
    const [rows] = await connection.query('SELECT * FROM empresa WHERE email = ?', [email]);
    return rows.length > 0;
};

module.exports.insertEmpresa = async (email, senha, cnpj) => {
    const connection = await db.connect();
    const [result] = await connection.query('INSERT INTO empresa (email, senha, cnpj) VALUES (?, ?, ?)', [email, senha, cnpj]);
    return result;
};