const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configuração de visualização
app.set('view engine', 'ejs');

const {
    BASE_URL,
    DB_HOST,
    DB_DATEBASE
} = require('./config');


// Rotas
const routes = require('./router/router');
app.use(routes);

module.exports = app;