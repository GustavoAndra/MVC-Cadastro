const mysql = require('mysql2/promise');

async function connect() {
    try {
        if (global.connection && global.connection.state !== 'disconnected') {
            return global.connection;
        }
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'janela1434',
            database: 'mvc'
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