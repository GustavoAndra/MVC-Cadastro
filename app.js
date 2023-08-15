const express = require('express');
const app = express();
const cors = require('cors');
// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');

const {
    BASE_URL,
    DB_HOST,
    DB_DATEBASE
} = require('./config');


// Rotas
const cadastroRouter = require('./router/cadastroRouter');
app.use(cadastroRouter);

const loginRouter = require('./router/loginRouter');
app.use(loginRouter);

module.exports = app;