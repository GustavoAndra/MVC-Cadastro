const mysql = require('mysql2/promise');

async function connect() {
    try {
        if (global.connection && global.connection.state !== 'disconnected') {
            return global.connection;
        }
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_USER_PASS,
            database: process.env.DB_DATABASE,
            port: process.env.DB_PORT
        });

        console.log("Conectou no MySQL!");
        global.connection = connection;
        return connection;
    } catch (error) {
        console.error("Erro ao conectar ao MySQL:", error);
        throw error;
    }
}

module.exports = {connect}