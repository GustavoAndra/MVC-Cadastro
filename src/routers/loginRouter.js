const express = require('express');
const loginRouter = express.Router();
const userController = require('../controllers/userController');

// Rota para exibir o formulário de login
loginRouter.get('/login', userController.mostrarFormularioLogin);

// Rota para processar o login
loginRouter.post('/login', userController.fazerLogin);

module.exports = loginRouter;