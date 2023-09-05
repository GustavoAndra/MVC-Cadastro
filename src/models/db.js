const mysql = require('mysql2/promise');

async function connect() {
    try {
        if (global.connection && global.connection.state !== 'disconnected') {
            return global.connection;
        }
        const connection = await mysql.createConnection({
            url: "mysql://root:Iax6uC5rPPFtZoeDYPOv@containers-us-west-37.railway.app:7103/railway",
            host: 'containers-us-west-37.railway.app',
            user: 'root',
            password: 'Iax6uC5rPPFtZoeDYPOv',
            database: 'railway',
            port: 7103
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