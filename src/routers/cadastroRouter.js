const express = require('express');
const cadastroRouter = express.Router();
const cadastroController = require('../controllers/cadastroController');


cadastroRouter.get('/cadastro', cadastroController.showCadastroForm);

cadastroRouter.post('/cadastro', cadastroController.cadastrarEmpresa);

module.exports = cadastroRouter;