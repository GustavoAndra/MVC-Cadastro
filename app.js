require('dotenv').config();
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const path = require('path');
const session = require('express-session');
const cors = require('cors');
const flash = require('connect-flash');

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configuração de arquivos estáticos
app.use(express.static(path.join(__dirname, "public")));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Configuração do express-session
app.use(cookieParser());
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: true,
        cookie: { maxAge: parseInt(process.env.SESSION_COOKIE_MAX_AGE) }
    })
);

app.use(flash());
app.locals = {
    stylesPath: '/styles',   // Caminho para os arquivos de estilo
    imagesPath: '/imagens',   // Caminho para as imagens
    jsPath: '/js'            // Caminho para os arquivos JavaScript
};

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