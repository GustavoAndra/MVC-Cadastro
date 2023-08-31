const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const cors = require('cors');

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configuração de arquivos estáticos
app.use(express.static(path.join (__dirname,"public")));

app.set('view engine', 'ejs');

// Configuração do express-session
app.use(session({
    secret: 'info63',
    resave: false,
    saveUninitialized: true
}));

app.locals = {
    stylesPath: '/styles',   // Caminho para os arquivos de estilo
    imagesPath: '/img',   // Caminho para as imagens
    jsPath: '/js'            // Caminho para os arquivos JavaScript
};

const {
    BASE_URL,
    DB_HOST,
    DB_USER_PASS,
    DB_PORT,
    DB_DATABASE
} = require('./config');

// Rotas
const homeRouter = require('./routers/homeRouter')
app.use(homeRouter);

const dashboardRouter = require('./routers/HomePageRouter');
app.use(dashboardRouter);

const loginRouter = require('./routers/loginRouter');
app.use(loginRouter);

const cadastroRouter = require('./routers/cadastroRouter');
app.use(cadastroRouter);

const cadastroFuncionarioRouter = require('./routers/funcionarioRouter');
app.use(cadastroFuncionarioRouter);

module.exports = app;