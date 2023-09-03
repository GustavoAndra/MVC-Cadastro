const express = require('express');
const loginRouter = express.Router();
const userController = require('../controllers/userController');

// Rota para exibir o formulário de login
loginRouter.get('/user', userController.mostrarFormularioLogin);

// Rota para processar o login
loginRouter.post('/user/login', userController.fazerLogin);

// Rota para deslogar
loginRouter.get('/user/deslogar', (req, res) => {
    delete req.session.user;
    res.redirect('/HomePage');
  });

module.exports = loginRouter;