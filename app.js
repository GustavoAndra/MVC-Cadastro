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

app.set('view engine', 'ejs'); // Substitua 'ejs' pelo mecanismo de visualização que você está usando
app.set('views', path.join(__dirname, 'views')); // Certifique-se de que o caminho esteja correto


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
const homeRouter = require('./routers/homeRouter');
const dashboardRouter = require('./routers/HomePageRouter');
const loginRouter = require('./routers/loginRouter');
const cadastroRouter = require('./routers/cadastroRouter');
const cadastroFuncionarioRouter = require('./routers/funcionarioRouter');

app.use(homeRouter);

app.use(dashboardRouter);

app.use(loginRouter);

app.use(cadastroRouter);

app.use(cadastroFuncionarioRouter);

module.exports = app;