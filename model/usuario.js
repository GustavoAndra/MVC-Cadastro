const db = require('./db');
const jwt = require("jsonwebtoken");

module.exports = {
    checkEmailExists: async (email) => {
        const connection = await db.connect();
        const [rows] = await connection.query('SELECT * FROM usuario WHERE email = ?', [email]);
        return rows.length > 0;
    },

    insertEmpresa: async (nome, email, senha) => {
        const connection = await db.connect();
        const [result] = await connection.query('INSERT INTO usuario (nome, email, senha) VALUES (?, ?, MD5(?))', [nome, email, senha]);
        return result;
    },

    inserirUsuario: async (nome, email,senha) => {
        const connection = await db.connect();
        const [result] = await connection.query('INSERT INTO usuario (nome, email, senha) VALUES (?, ?, MD5(?))', [nome, email,senha]);
        return result;
    },

    verificarExistenciaEmailSenha: async (email, senha) => {
        const connection = await db.connect();
        const [rows] = await connection.query('SELECT * FROM usuario WHERE email = ? AND senha = ?', [email, senha]);
        return rows.length > 0 ? rows[0] : null;
    }
};