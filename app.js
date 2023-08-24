const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const session = require('express-session'); // Adicione esta linha para importar o express-session

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.set('view engine', 'ejs');
// Configuração de arquivos estáticos
app.use(express.static("public"));

// Configuração do express-session
app.use(session({
    secret: 'info63',
    resave: false,
    saveUninitialized: true
}));

const {
    BASE_URL,
    DB_HOST,
    DB_DATABASE
} = require('./config');

// Rotas
const homeRouter = require('./router/homeRouter')
app.use(homeRouter);

const dashboardRouter = require('./router/HomePageRouter');
app.use(dashboardRouter);

const loginRouter = require('./router/loginRouter');
app.use(loginRouter);

const cadastroRouter = require('./router/cadastroRouter');
app.use(cadastroRouter);


module.exports = app;