const express = require('express');
const cadastroRouter = express.Router();
const cadastroController = require('../controllers/cadastroController');

// Rota para exibir o formulário de cadastro de empresa
cadastroRouter.get('/cadastro', cadastroController.showCadastroForm);

// Rota para cadastrar uma nova empresa
cadastroRouter.post('/cadastro', cadastroController.cadastrarEmpresa);

module.exports = cadastroRouter;