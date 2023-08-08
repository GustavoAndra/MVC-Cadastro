const mysql = require("mysql2/promise");

async function connect() {
  if (global.connection && global.connection.state !== "disconnected") {
    return global.connection;
  }
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'janela1434',
    database: 'mvc',
  });

  console.log("Conectou no MySQL!");

  global.connection = connection;
  return connection;
}

module.exports = { connect };