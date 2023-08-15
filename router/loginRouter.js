const express = require('express');
const loginRouter = express.Router();
const userController = require('../controller/userController');

// Rota para exibir o formulário de login
loginRouter.get('/login', userController.mostrarFormularioLogin);

// Rota para processar o login
loginRouter.post('/login', userController.fazerLogin);

module.exports = loginRouter;